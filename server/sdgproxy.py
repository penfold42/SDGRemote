#!/usr/bin/env python3

import socket
import signal
import sys
import os
import time
import functools
import pyvisa
import base64
import asyncio
import json
import logging
import websockets
from http import HTTPStatus
from urllib.parse import unquote

# List of target devices.
# Only tested with TCP sockets at present
devices = {
#      Label            pyVISA path
    "siggen.home":  'TCPIP0::siggen.home::5025::SOCKET',
    "pi4-nc":       'TCPIP0::pi4.home::5025::SOCKET',
}

# put your default here - must be in devices list above
currentDevice = "siggen.home"

# web server configuration
listenOn = ""
#listenOn = "127.0.0.1"
listenPort = 6789

##########################################################
#### Code starts here
MIME_TYPES = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css",
    "ico": "image/x-icon"
}


rm = pyvisa.ResourceManager()

logging.basicConfig()

USERS = set()

cachedReplies = {}
cachedTime = {}
cachedHitCount = {}


"""
This code allows you to serve static files from the same port as the websocket connection

This is only suitable for small files and as a development server!
open(full_path, 'rb').read() call that is used to send files will block the whole asyncio loop!
"""

async def crapWebServer(server_root, path, request_headers):
    """Serves a file when doing a GET request with a valid path."""

    if "Upgrade" in request_headers:
        return  # Probably a WebSocket connection

    path = unquote(path)
    path = path.split('?', 1)[0]

    if path == '/':
        path = '/index.html'

    response_headers = [
        ('Server', 'asyncio websocket server'),
        ('Connection', 'close'),
    ]

    # Derive full system path
    full_path = os.path.realpath(os.path.join(server_root, path[1:]))
    # Validate the path
    if os.path.commonpath((server_root, full_path)) != server_root or \
            not os.path.exists(full_path) or not os.path.isfile(full_path):
        print("HTTP GET {} 404 NOT FOUND".format(path))
        return HTTPStatus.NOT_FOUND, [], b'404 NOT FOUND'

    # Guess file content type
    extension = full_path.split(".")[-1]
    mime_type = MIME_TYPES.get(extension, "application/octet-stream")
    response_headers.append(('Content-Type', mime_type))

    # Read the whole file into memory and send it out
    body = open(full_path, 'rb').read()
    response_headers.append(('Content-Length', str(len(body))))
    print("HTTP GET {} 200 OK".format(path))
    return HTTPStatus.OK, response_headers, body

def setDevice(key):
    if key in devices:
        global inst, currentDevice
#:        inst.close()
        currentDevice = key
        inst = rm.open_resource(devices[currentDevice],
                                timeout=1000,
                                chunk_size = 24*1024*1024)
        inst.read_termination = '\n'
        inst.write_termination = '\n'

        cachedTime.clear()
        return (True)
    else:
        print ("unknown device " + key)
        print ("I know of:")
        for d in devices:
            print (d + ": \t" + devices[d])
        return (False)


def users_event():
    return json.dumps({"type": "users", "count": len(USERS)})

def ledHack_event(event):
    return json.dumps({"type": "ledHack", "value": event["argument"]})

def wsError(msg):
    print (msg);
    return( json.dumps({ "type": "error", "value": msg }));

def getDevices_event():

    jsondata = {}
    jsondata['type'] = 'getDevices'
    jsondata['currentDevice'] = currentDevice
    jsondata['value'] = devices
#    print(json.dumps(jsondata, indent=4)) 
    return json.dumps(jsondata)

def scpi_visa(event):

    action = event["action"]
    param = event["argument"]
    updateResponse = event["updateResponse"]

    ageLimit = time.time() - 0.5

    msgType = ""
    data = ""
    results = []
    match action:
        case "scpiQuery":
            params = param.split('\n')
            for x in params:

                if (x == "rosc?"):
                    print (time.time())
                    print (cachedHitCount)

                if (len(x)):
                    key = x
                    if (key in cachedTime) and (cachedTime[key] > ageLimit):
                        reply = cachedReplies[key]
                        if (key in cachedHitCount):
                            cachedHitCount[key] += 1
                        else:
                            cachedHitCount[key] = 1
                    else:
                        reply = inst.query(x)
                        cachedReplies[key] = reply
                        cachedTime[key] = time.time()
                    results.append (reply)
            data = "\n".join(results)
            msgType = "scpi"

        case "scdp":
            key = "scdp"
            if (key in cachedTime) and (cachedTime[key] > ageLimit):
                data = cachedReplies[key]
                if (key in cachedHitCount):
                    cachedHitCount[key] += 1
                else:
                    cachedHitCount[key] = 1
            else:
                inst.write(param)
                data = base64.b64encode(inst.read_raw()).decode();
                cachedReplies[key] = data
                cachedTime[key] = time.time()

            msgType = "scdp"

        case "scpiCmd":
            inst.write(param)
            msgType = "scpi"
            cachedTime.clear()

        case _:
            msgType = "none"
            data = "blah"

    return (json.dumps({
            "type": msgType,
            "value": data,
            "updateResponse": updateResponse,
            "currentDevice": currentDevice
        }))



async def sdgproxy(websocket):
    global USERS
    try:
        # Register user
        USERS.add(websocket)
        websockets.broadcast(USERS, users_event())

        async for message in websocket:
            event = json.loads(message)

            match event["action"]:
                case "scpiCmd" | "scpiQuery" | "scdp":
                    try:
                        visa = scpi_visa(event)
                        if (event["updateResponse"] == True):
                            await websocket.send( visa );
                        else:
                            websockets.broadcast(USERS, visa );
                    except Exception as e:
                        await websocket.send( wsError("VISA: " + str(e)))

                case "getDevices":
                        websockets.broadcast(USERS, getDevices_event() )

                case "setDevice":
                    if setDevice(event["argument"]):
                        websockets.broadcast(USERS, getDevices_event() )

                case "ledHack":
                        websockets.broadcast(USERS, ledHack_event(event) )

                case _:
                    logging.error("unsupported event: %s", event)
    except Exception as e:
        print ("WS exception: ", end="")
        print (str(e))

    finally:
        # Unregister user
        USERS.remove(websocket)
        websockets.broadcast(USERS, users_event())

blah = ""
def signal_handler(sig, frame):
        print("got Ctrl-C, closing")
        inst.close()
        rm.close()
        sys.exit(0)

async def main():
    setDevice(currentDevice)
    serverRoot = os.path.join(os.getcwd(), "html")
    print ("Serving html content from " + serverRoot)
    myHost = listenOn
    if ((myHost == "") or (myHost == "0.0.0.0") or (myHost == "::")
    ):
        myHost = socket.gethostname()

    print ("Point your web browser to:")
    print (f'http://{myHost}:{listenPort}/')

    handler = functools.partial(crapWebServer, serverRoot)
    async with websockets.serve(sdgproxy, listenOn, listenPort,
        process_request=handler):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    try:
        asyncio.run(main())
    except Exception as e:
        print ("main() exception: ", end="")
        print (str(e))



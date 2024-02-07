#  Quick start instructions
This will use the sdgproxy.py python websockets proxy as the web server

## Host requirements.
Very little! 
- A host with network connectivity to your Siglent SDX2000X.
- python3 version >= 3.8

This has been tested on:
- Windows 11 + Python 3.11.2
- Debian GNU/Linux 12 + Python 3.11.2
- Rocky Linux 8.9 + Python 3.8.17

## Install python3 on your host
Make sure its python3 version >= 3.8.

Note, you might have multiple versions of python 3.x installed and the default could be an older version.  Check with:
```
$ python3 -V
Python 3.6.8
```
In this case, the default is too old. I also have python3.11 installed so I force a version by running `python3.11` and `pip3.11`.

## Install python dependencies
-Debian has the dependencies as part of the distribution:
```
sudo apt-get install python3-pyvisa python3-pyvisa-pi python3-websockets
```

-Other platforms. First check if your distribution provides the packages (like Debian does). If not, install with pip3:
```
pip3 install --user pyvisa pyvisa-py websockets
```

## download SDGRemote from github
Either clone the repository with your favourite git tool or download and then extract the .zip file.

### Command line:
```
cd $HOME (or %HOMEPATH% on windows)
git clone https://github.com/penfold42/SDGRemote
cd SDGRemote
```

### Download zip
- Download and extract the zip file.
- open a command prompt and cd into the extracted contents

## Configure your siglent device name/ip
- Use your favourite text editor to open server/sdgproxy.py

Below is the sample section - 

### Siglent SDG2000x connection info
Replace siggen.home with device name or ip address.
You need to set it in the devices list AND currentDevice
```
# List of target devices.
# Only tested with TCP sockets at present
devices = {
    "siggen.home": 'TCPIP0::siggen.home::5025::SOCKET',
    "pi4-nc": 'TCPIP0::pi4.home::5025::SOCKET',
}

# put your default here - must be in devices list above
currentDevice = "siggen.home"
```

You can also change the IP address and TCP port the python proxy will listen on.

The defaults are listen on all network interface on port 6789:
```
# web server configuration
listenOn = ""
#listenOn = "127.0.0.1"
listenPort = 6789
```

## Start the server
You MUST start the python proxy server with your current directory being the parent of the server directory or it wont find the html content

Start the server with `./server/sdgproxy.py`.

If all goes well you'll be greeted with:
```
penfold@pi4:~/github/SDGRemote $ python3 ./server/sdgproxy.py
Serving html content from /home/penfold/github/SDGRemote/html
Point your web browser to:
http://pi4:6789/
```

point your browser at http://<webserver>:6789/

## Troubleshooting
Can you ping the signal gernerator?

Can you telnet or netcat to port 5025?
- The device will only respond to the first connection. Subsequent simultaneous connections will actuall connect, you no replies will come.
- Make sure no other hung or forgotten process is connected to the device




# Configurable options.

## Macros
The SCPI tools area allows you to enter freeform commands and queries or choose from a pre-configured drop-down list of macros to run.

These are defined in `html/sdg-macros.json`

## Options
You can change a number of options in `html/sdg-config.json`

#### `"updateTime": 500,`
How often to refresh the page in milli-seconds.

#### `"smallUpdateCycles": 3,`
Every button or command will initiate a short refresh cycle (if refresh is off)

#### `"longUpdateCycles": 7200, `
How long should Refresh last? 7200 seconds = 2 hours.

#### `"idleTimeout": 10,`
If you turn refresh off, the screen will dim after 10 seconds

#### `"highlightNew": true,`
Every time the screen is updated a visual emphasis is applied

#### `"macrosUpdateHistory": true,`
Do macros run from the dropdown box also populate (or polute) the history buffer

#### `"scpiResultsAppend": true,`
Do new scpi query results add the pane

#### `"scpiHeightPx": 100,`
Height of the scpi tools area

#### `"wsGateway": "ws://pi4.home:6789"`
If you are using a standalone web server, the client browser needs to know where the python proxy is located



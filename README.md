# SDGRemote web interface for your Siglent SDG2000x 

## About
Unlike their scopes, the signal generators sadly don't feature a web UI. Thankfully their SCPI command support gives us nearly everything we need.

In my lab, the screen size is just usable and with a deep bench its an uncomfortable reach for the buttons!

Now I can use the PC or my phone or tablet. The frequency counter view is super useful

All modern browsers are supported. Firefox and iOS are my primary targets but I regularly test with Edge, Chrome and Opera.

Tested with SDG2000x but should "just work" with SDG1000X/SDG2000X/SDG6000X/SDG6000X-E as the command documentation treats them equally.

As browsers cannot make arbitrary TCP connections a python websockets server acts as "proxy".
This is based on pyVISA to communicate with the device using SCPI over TCP socket and also serves up the web page.

### Other devices
- The SDG5000 will need further testing of the proxy to use USB serial comms rather than TCP/IP.
- The SDG800/SDG1000 will require more rework as the front panel is quite different.

Let me know in the Issues list if there's demand for either of these and if you can help with testing

## Demos
I have a "live" demo hosted at https://penfold42.github.io/SDGRemote

### [Virtual Front Panel](https://penfold42.github.io/SDGRemote/?view=frontpanel)

- Look and feel of the real device
- buttons instead of rotary knob (rotary knobs are a pain to use in browsers)
- live screen updates from the device
- virtual buttons with keyboard shortcuts
- macros! configure commonly used functions and pick from a dropdown list. In two mouse clicks I could have:
  - an audio FM modulated output at 108MHz
  - an audio AM modulated output at 774kHz
  - set the reference to external
  - 0-5V outputs
 
- key beep (off by default)

### [Frequency Counter](https://penfold42.github.io/SDGRemote/?view=counter)

Look and feel inspired by a real counter. Buttons for:
- Current frequency
- Duty cycle
- Reference frequency
- Deviation from reference
- low pass filter, AC/DC

### [SCPI commands](https://penfold42.github.io/SDGRemote/?view=tools&scpiheight=300)
- Arbitrary SCPI commands with responses viewed
- Command history with cursor up/down
- plain text and a property/value table views

### [Quick Help](https://penfold42.github.io/SDGRemote/?view=help)
- Keyboard Shortcuts
- URL parameters
- Handy links to Siglent docs
    
### [All in one](https://penfold42.github.io/SDGRemote/?view=all)
Shows all interfaces on the same page


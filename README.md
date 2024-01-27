Uses SCPI over TCP socket via a cgi-bin perl web hosted "proxy".

Tested with SDG2000x but should "just work" with SDG1000X/SDG2000X/SDG6000X/SDG6000X-E as the command documentation treats them equally.

The SDG800/SDG1000 and SDG5000 will need rewrite of the proxy to use USB serial comms rather than TCP/IP.

The SDG1000/SDG800 will require more rework as the front panel is quite different. Let me know in the Issues list if theres demand
    
http://<webhost>/sdg.html?device=<siggenname>&view=frontpanel
virtual front panel with:
    	screen capture
    	virtual buttons
    	keyboard shortcuts
    	Arbitrary SCPI commands with response
    
http://<webhost>/sdg.html?device=<siggenname>&view=counter
Frequency Counter with:
    	Current frequency
    	Duty cycle
    	Reference frequency
    	Deviation from ref
    
http://<webhost>/sdg.html?device=<siggenname>&view=all
Shows both interfaces on the same page


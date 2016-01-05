# bart-light

###Representing Bart train departure times visually using NeoPixel LEDs.

####Components:
- Particle Photon device (To request/parse data & control LEDs)
- Custom PHP script (to parse and reformat Bart data)
- Bart API (currently using standard/default API key)

####The Device
![Current hardware device](http://jheppert.github.io/bart-light/img/device.jpg)

####How It Works
Every 60 seconds, the Particle Photon (Photon Code.cpp) requests the PHP script (index.php). The PHP script requests data from the Bart API, parses the XML for the data it needs, and outputs the result in a simplified format. The Particle Photon parses the data, and uses that information to control indicating LEDs.

Since the Particle Photon cannot (to my knowledge) request from the PHP script directly, I am using a Webhook. This is set up through the command line, and it checks the PHP URL independent of the device's code, and then returns the results to the device code. I assume this is part of some MVC methodology, but works for me either way.

Because of the limited memory of the Particle Photon device, most of the parsing is done by the PHP script. Only the essential data is given to the device in a simple format: **color:time,color:time** where **color** is the color of the train line, and **time** is the time until that train arrives. The color will be used to visually indicate which line corresponds to the arrival times.

####In Its Current State
Instead of the LED strips, it currently uses just two individual NeoPixel LEDs (WS2812b: they're what I had to work with at the time). It also uses an error LED, although since I switched from Heroku to my PHP script, I haven't needed it.

####Recent Changes
At first, I used Heroku to host a node.js app that did the parsing of the Bart API XML, mostly because I am more comfortable in JavaScript than in PHP. This served its purpose, but was slower than I would have liked. There were also periodic errors that I had trouble figuring out. Once I had a little more time I was able to write a custom hosted PHP script to handle that task, eliminating the need for the Heroku hosted node.js app.

####Next Steps
The final phase in making it all work is to order & connect the NeoPixel LED strips. I am thinking of using 3 strips of maybe 15-20 LEDs. 

Since I plan on using this in everyday life, I want to make an enclosure for it. Some considerations for that:
- Where it will be placed in the house
- Vertical or horizontal orientation
- What type of material to use
- The type of 5V power supply to use
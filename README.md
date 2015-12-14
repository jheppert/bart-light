# bart-light

##Proof of concept project

Represent Bart train departure times visually using NeoPixel leds.

Using:
- Particle Photon device (To request/parse data & control LEDs)
- Heroku service, running node.js app to convert Bart API XML to simple CSV data (eventually JSON data as the project progresses)
- Bart API request (curretly using standard/default API key)

To Do:
- Remove un-necessary npm package folders & update dependencies list
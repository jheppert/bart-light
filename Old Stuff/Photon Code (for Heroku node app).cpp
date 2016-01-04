// This #include statement was automatically added by the Particle IDE.
#include "neopixel/neopixel.h"

// ERROR CHECKING:
// int ledError = D0;

// IMPORTANT: Set pixel COUNT, PIN and TYPE
#define PIXEL_PIN D2
#define PIXEL_COUNT 1
#define PIXEL_TYPE WS2812B

SYSTEM_MODE(AUTOMATIC);

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

// called once on startup
void setup() {
    
    strip.begin();
    strip.setPixelColor(0, 0, 0, 255);
    // strip.setPixelColor(1, 0, 0, 255);
    strip.show(); // Initialize all pixels to 'off'

    Serial.begin(115200);
    
    // ERROR CHECKING:
    // pinMode(ledError, OUTPUT);

    // Listen for the hook response
    Particle.subscribe("hook-response/get_bart", gotBartData, MY_DEVICES);

    // 5 second countdown to open the serial monitor
    for(int i=0;i<5;i++) {
        Serial.println("waiting " + String(5-i) + " seconds before we publish");
        delay(1000);
    }
}


// called forever really fast
void loop() {

    Serial.println("Requesting Bart data...");

    // publish the event that will trigger our Webhook
    Particle.publish("get_bart");

    // and wait at least 60 seconds before doing it again
    delay(60000);
}

// This function will get called when Bart data comes in
void gotBartData(const char *name, const char *data) {
    
    // ERROR CHECKING:
    // digitalWrite(ledError, LOW);
    
    String dataString = String(data);
    Serial.println(dataString);
    
    // TODO:
    // ADJUST FOR NEW CUSTOM PHP URL IN WEBHOOK
    // PARSE FOR NEW COLOR DATA
    // MAKE SURE IF NO DATA FOR A LED SET, TURN LEDS OFF
    
    int dataThing[2];
    int numArgs = 0;
    
    int beginIdx = 0;
    int idx = dataString.indexOf(",");
    
    String arg;
    char charBuffer[16];
    
    while (idx != -1)
    {
        arg = dataString.substring(beginIdx, idx);
        arg.toCharArray(charBuffer, 16);
    
        // add error handling for atoi:
        dataThing[numArgs++] = atoi(charBuffer);
        beginIdx = idx + 1;
        idx = dataString.indexOf(",", beginIdx);
    }
    
    dataThing[numArgs++] = atoi(dataString.substring(beginIdx));
    // Serial.println(dataString.substring(beginIdx));
    // Serial.println(beginIdx);
    
    for(int i=0; i<2; i++) {
        Serial.println(dataThing[i]);
    }
    
    
    Serial.print("Going into if statements: ");
    Serial.println(dataString);
    
    if(dataString[0] == '<') {
        Serial.println("Error with getting data");
        strip.setPixelColor(0, 0, 0, 0);
        strip.show();
        // ERROR CHECKING:
        // digitalWrite(ledError, HIGH);
    } else {
        Serial.println("Got Bart data");
        // ERROR CHECKING:
        // digitalWrite(ledError, LOW); 
        
        // for(int i=0; i<2; i++) {
        //      if(dataThing[i] >= 12) {
        //         Serial.print(dataThing[i]);
        //         Serial.print(": ");
        //         Serial.println("Setting green");
        //         strip.setPixelColor(i, 0, 255, 0);
        //     } else if(dataThing[i] <= 11 && dataString.toInt() >= 7) {
        //         Serial.print(dataThing[i]);
        //         Serial.print(": ");
        //         Serial.println("Setting yellow");
        //         strip.setPixelColor(i, 255, 255, 0);
        //     } else if(dataThing[i] < 7) {
        //         Serial.print(dataThing[i]);
        //         Serial.print(": ");
        //         Serial.println("Setting red");
        //         strip.setPixelColor(i, 255, 0, 0);
        //     }
        }
        
        strip.show();
    }

}

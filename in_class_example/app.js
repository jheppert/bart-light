//the child_process library let's us execute command line commands, https://nodejs.org/api/child_process.html
var exec = require('child_process').exec;
//This variable stores the command we want to execute, we are going to use the say command
var say = 'say ';

//create a bart oobject that queries the API every 5 seconds, use npm install bart to install
var bart = require('bart').createClient({"interval":20000});

//create new johnny-five object and board
var five = require("johnny-five"),
  board, lcd;
board = new five.Board();

//When the board is ready
board.on("ready", function() {

//create a new LCD object
  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 12  11   5   4   3   2
    pins: [12, 11, 5, 4, 3, 2],
    backlight: 6,
    rows: 2,
    cols: 16
  });

//let's make a function that speaks
function speak(whatosay){
  //speak the string
  exec(say + whatosay);
  //log it to the console
  console.log(whatosay)
}

function queryBart(){
//choose which bart staion to to monitor, station abbreviations are here: http://api.bart.gov/docs/overview/abbrev.aspx
bart.on('powl', function(estimates){
   //log the results to the console
   console.log(estimates); 
   // store the results in some variables
   var nextTrain = "next train in " + estimates[0].minutes;
   var dest = "Dest: " + estimates[0].destination;
   // print results to the lcd
   setTimeout(function() {
   lcd.cursor(0, 0).clear().print(nextTrain + "M");
   lcd.cursor(1, 0).print("Dest: " + estimates[0].destination);
   // call the function
   speak(nextTrain + " minutes" + " destination is " + estimates[0].destination);
   }, 1000);
})
}

//call the function
queryBart();

});

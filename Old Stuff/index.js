
var app = require('express')();
var http = require('http').Server(app);
var parseString = require('xml2js').parseString;
var request = require('request');


function queryBart(req, res){
    console.log("in the function");

    // Begin new test:
    var timeToStation = 3;
    var result = {};
    request('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=deln&' +
    'key=MW9S-E7SL-26DU-VV8V&dir=s', function(error, response, body) {

    if (!error && response.statusCode === 200) {
        // res.json(body);
      parseString(body, function (error, result) {
        var departures = [];
        var response = "";
        var lines = result.root.station[0].etd;
        lines.forEach(function(line) {
          line.estimate.forEach(function(train) {
            if (train.minutes[0] !== 'Leaving') {
              departures.push(parseInt(train.minutes[0]));
            }
          });
        });

        departures.sort(function(a, b) {
          return a - b;
        });

        // for(var i=0; i<2; i++) {
        //     if(departures[i] > 4) {
        //         if(i == 1) {
        //             response += ",";
        //         }
        //         response += departures[i];
        //     }
        // }

        response = departures[0] + "," + departures[1];

        res.send(response);



        

        
        
      });
    } else {
      console.log(error);
    }
});








    // bart.on('mont south', function(data){ // REMOVED FROM BUGGY VERSION
    // // console.log(data); //Output raw returned data
    // var trainData = data[0].minutes + "," + data[1].minutes; // REMOVED FROM BUGGY VERSION
    // // var  trainData = [];
    // // for(var i in data) {
    // //   // trainData.push({ "destination": data[i].destination, "minutes": data[i].minutes });
    // //   trainData.push(data[i].minutes);
    // //   // console.log(data[i].destination + " train comes in " + data[i].minutes + " minutes");
    // // }

    // // res.setHeader('Content-Type', 'application/json');
    // res.json(trainData);
    // // server = app.listen(process.env.PORT);
    // // setTimeout(function () {
    // //     server.close();
    // //     // ^^^^^^^^^^^
    // // }, 3000);

    // });

}
    
app.get('/', function(req, res){
    queryBart(req, res);
});

// queryBart();

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


var http = require('http');
var app = require('express')();
var bart = require('bart').createClient();

//Serve index.html when some make a request of the server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

function queryBart(){

  bart.on('deln south', function(data){
    // console.log(data); //Output raw returned data
    var  trainData = [];
    for(var i in data) {
      trainData.push({ "destination": data[i].destination, "minutes": data[i].minutes });
      // console.log(data[i].destination + " train comes in " + data[i].minutes + " minutes");
    }

    console.log(trainData);

    // Return the data via JSON object:
    var app = http.createServer(function(req,res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "message": "hey there" }));
    });
    
    // http.listen(3000, function() {
    //     console.log('listening on *:3000');
    // });

  });

}

queryBart();


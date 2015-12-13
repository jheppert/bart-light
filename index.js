
var app = require('express')();
var http = require('http').Server(app);
var bart = require('bart').createClient();


function queryBart(req, res){
    console.log("in the function");

    bart.on('deln south', function(data){
    // console.log(data); //Output raw returned data
    var  trainData = [];
    for(var i in data) {
      trainData.push({ "destination": data[i].destination, "minutes": data[i].minutes });
      // console.log(data[i].destination + " train comes in " + data[i].minutes + " minutes");
    }

    // console.log(trainData);
    // return trainData;
    res.setHeader('Content-Type', 'application/json');
    res.json(trainData);

    });

}
    
app.get('/', function(req, res){
    queryBart(req, res);
});

// queryBart();

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


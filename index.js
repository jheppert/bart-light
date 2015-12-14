
var app = require('express')();
var http = require('http').Server(app);
var bart = require('bart').createClient({"inverval":0});


function queryBart(req, res){
    console.log("in the function");

    bart.on('mont south', function(data){
    // console.log(data); //Output raw returned data
    var trainData = data[0].minutes + "," + data[1].minutes;
    // var  trainData = [];
    // for(var i in data) {
    //   // trainData.push({ "destination": data[i].destination, "minutes": data[i].minutes });
    //   trainData.push(data[i].minutes);
    //   // console.log(data[i].destination + " train comes in " + data[i].minutes + " minutes");
    // }

    // res.setHeader('Content-Type', 'application/json');
    res.json(trainData);
    // server = app.listen(process.env.PORT);
    // setTimeout(function () {
    //     server.close();
    //     // ^^^^^^^^^^^
    // }, 3000);

    });

}
    
app.get('/', function(req, res){
    queryBart(req, res);
});

// queryBart();

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


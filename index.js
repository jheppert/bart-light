
var bart = require('bart').createClient();

function queryBart(){

  bart.on('deln south', function(data){
    // console.log(data); //Output raw returned data
    var  trainData = [];
    for(var i in data) {
      trainData.push({ "destination": data[i].destination, "minutes": data[i].minutes });
      // console.log(data[i].destination + " train comes in " + data[i].minutes + " minutes");
    }

    console.log(trainData);

  });

}

queryBart();


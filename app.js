const express = require('express')
const https = require("https");
const bodyParser = require("body-parser")
const fs = require("fs")
const app = express()
const port = 80

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', express.static('public'));

var dataValue = "Real-Time Pulse ";
var pulseValue = 1;

// const url = "https://api.thingspeak.com/channels/1780944/feeds.json?api_key=X5A83VA0WFBHKWRV&results=2"
const url = "https://api.thingspeak.com/channels/1943514/feeds.json?api_key=UKV05R56CPXEVFRA&results=2"
const url2 = "https://api.thingspeak.com/channels/1943517/feeds.json?api_key=4CWW5ZVDS6D7FGT7&results=2"
const url3 = "https://api.thingspeak.com/channels/1943526/feeds.json?api_key=DPFC4JA33O8DALM8&results=2"

app.get('/new-project', function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });


  var interval = setInterval(function() {

    https.get(url, function(response) {
      response.on("data", function(data) {
        patientData = JSON.parse(data)
        pulse = patientData.feeds[0].field1;
        spo2 = patientData.feeds[0].field2;
        temperature = patientData.feeds[0].field3;
        var pulseValue = pulse;
        dataValue = "Real-Time Pulse " + pulseValue;
        // console.log("SENT: "+ dataValue);
        // res.write('data: ' + { "d1": "pulse", "d2": "temperature" } +'\n\n')

        // res.write("data: "+ pulse + temperature +"\n\n")
        // res.write("data: " + pulse + "\n")
        // res.write("data: " + spo2 + "\n")
        // res.write("data: " + temperature + "\n")
        // console.log("patient 1");
        // console.log("pulse1 =", pulse);
        // console.log("spo1 =",spo2);
        // console.log("temp1 =",temperature);
        // res.write("data: "\n\n")
        // res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${data}\n\n`);
        // JSON.stringify({ x: 5, y: 6 }));


      });
    });
//2nd data begining
https.get(url2, function(response) {
  response.on("data", function(data) {
    patientData2 = JSON.parse(data)
    pulse2 = patientData2.feeds[0].field1;
    spo22 = patientData2.feeds[0].field2;
    temperature2 = patientData2.feeds[0].field3;
    var pulseValue2 = pulse2;
    dataValue2 = "Real-Time Pulse " + pulseValue2;
    // console.log("SENT: "+ dataValue);
    // res.write('data: ' + { "d1": "pulse", "d2": "temperature" } +'\n\n')

    // res.write("data: "+ pulse + temperature +"\n\n")
    // res.write("data: " + pulse + "\n")
    // res.write("data: " + spo2 + "\n")
    // res.write("data: " + temperature + "\n")
    // console.log("patient 1");
    // console.log("pulse1 =", pulse);
    // console.log("spo1 =",spo2);
    // console.log("temp1 =",temperature);
    // res.write("data: " + pulseValue2 + "\n")
    // res.write("data: " + spo22 + "\n")
    // res.write("data: " + temperature2 + "\n\n\n")
    // console.log("patient 2");
    // console.log("pulse2 =", pulse2);
    // console.log("spo22 =",spo22);
    // console.log("temp2 =",temperature2);
    // res.write("data: "\n\n")
    // res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${data}\n\n`);
    // JSON.stringify({ x: 5, y: 6 }));


  });
});
//2nd data end

//3rd data begining
https.get(url3, function(response) {
  response.on("data", function(data) {
    patientData3 = JSON.parse(data)
    pulse3 = patientData3.feeds[0].field1;
    spo23 = patientData3.feeds[0].field2;
    temperature3 = patientData3.feeds[0].field3;
    var pulseValue3 = pulse3;
    dataValue3 = "Real-Time Pulse " + pulseValue3;
    res.write("data: " + pulse + "\n")
    res.write("data: " + spo2 + "\n")
    res.write("data: " + temperature + "\n")
    console.log("patient 1");
    console.log("pulse1 =", pulse);
    console.log("spo1 =",spo2);
    console.log("temp1 =",temperature);
    res.write("data: " + pulse2 + "\n")
    res.write("data: " + spo22 + "\n")
    res.write("data: " + temperature2 + "\n")
    console.log("patient 2");
    console.log("pulse2 =", pulse2);
    console.log("spo22 =",spo22);
    console.log("temp2 =",temperature2);
    res.write("data: " + pulseValue3 + "\n")
    res.write("data: " + spo23 + "\n")
    res.write("data: " + temperature3 + "\n\n\n\n")
    console.log("patient 3");
    console.log("pulse3 =", pulse3);
    console.log("spo23 =",spo23);
    console.log("temp3 =",temperature3);

  });
});
//3rd data end
    // data = "Real-Time Update "+number;
    // console.log("SENT: "+data);
    // res.write("data: " + data + "\n\n")
    // number++;
  }, randomInteger(2, 9) * 500);

  // close
  res.on('close', () => {
    clearInterval(interval);
    res.end();
  });
})

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("http://localhost/html/index.html", function(reqs, resp) {

})

app.post("/", function(reqs, resp) {
  const query1 = reqs.body.from;
  const query2 = reqs.body.to;
  const query3 = reqs.body.patienttable;
  // const dwnld_url = "https://api.thingspeak.com/channels/1780944/feeds.csv?start=" + query1 + "&end=" + query2;
  // const dwnld_url = "https://api.thingspeak.com/channels/1943514/feeds.csv?start=" + query1 + "&end=" + query2; //original
  const dwnld_url = "https://api.thingspeak.com/channels/"+ query3 +"/feeds.csv?start=" + query1 + "&end=" + query2;
  // const dwnld_url = "https://api.thingspeak.com/channels/1780944/feeds.csv?start=2022-11-06&end=2022-11-07";
  const file = fs.createWriteStream("file.csv");
  https.get(dwnld_url, function(resp) {
    console.log(resp.statusCode);
    resp.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");

    });

  });
  console.log("data fetched from "+query1+" to "+query2+" of "+query3);
  // resp.write("data fetched from "+query1+" to "+query2+" of "+query3 "\n");
  resp.redirect('http://localhost/html/logs.html');
  // console.log(reqs.body.from);
  // console.log(reqs.body.to);
  // console.log("post recieved");
})


app.listen(process.env.PORT || port, () => {
  console.log(`Listening at http://localhost:${port}/html/index.html`)
})

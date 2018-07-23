var express = require('express');
var app = express();

var request = require('request');

var key = "AIzaSyCxVMme4ENcVbbIEok3tQo8No8LXUxfokg";

//-----------------------
var channel;
var newdata;
//----------------------


"https://www.googleapis.com/youtube/v3/search?key="+key+"&channelId=UCwu9Cj2Poy6nXdSaw01fYpQ&part=snippet,id&order=date&maxResults=20"

function finderapi(){
    request("https://www.googleapis.com/youtube/v3/search?key="+key+"&channelId=UCwu9Cj2Poy6nXdSaw01fYpQ&part=snippet,id&order=date&maxResults=20", function(err, res, body) { 
      var url;
      var title;
      var time;
      body = JSON.parse(body);
      console.log(body["items"][0]); 
      url = "https://www.youtube.com/watch?v="+body["items"][0]["id"]["videoId"];
      time = body["items"][0]["snippet"]["publishedAt"];
      title = body["items"][0]["snippet"]["title"];
      newdata = {
        "url" : url,
        "title" : title,
        "time" : time
      };
    });
   request("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCwu9Cj2Poy6nXdSaw01fYpQ&key="+key,
    function(err,res,body){
      body = JSON.parse(body);
      console.log(body["items"][0]["statistics"]["subscriberCount"]);



      channel = {
        "sub":body["items"][0]["statistics"]["subscriberCount"],
        "view":body["items"][0]["statistics"]["viewCount"],
        "id" : "UCwu9Cj2Poy6nXdSaw01fYpQ",
        "video":body["items"][0]["statistics"]["videoCount"],
        "image":"https://yt3.ggpht.com/-bMzClc5bMW0/AAAAAAAAAAI/AAAAAAAAAAA/ltoAske6VvU/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg"
      };  
    });
}


finderapi();
setInterval(finderapi,600000);



app.get('/chodaapi', function (req, res) {
  res.send(JSON.stringify({
    "new":newdata,
    "channel":channel
  }));
});

app.listen(process.env.PORT || 8080 ,"0.0.0.0", function () {
  console.log('api가 켜짐');
});

var express = require('express');
var path = require('path');
var app = express();
// app.set('view engine', 'ejs');

app.get('/', function(req, res){
    // res.send("wor");
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(path.join(__dirname, '../build/contracts')));
app.use(express.static(path.join(__dirname, '../public')));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
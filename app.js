var express = require("express");
var app = express();
var port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var url = 'mongodb://admin1:password1@ds163630.mlab.com:63630/sukhman-task-list';
mongoose.connect(url);

var nameSchema = new mongoose.Schema({firstName: String, lastName: String});

var Collection = mongoose.model("arduino-logs", nameSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/test", (req, res) => {
  res.send({name: 'Sukhman', work: 'yes'});
});

app.post("/addname", (req, res) => {
  var myData = new Collection(req.body);
  myData.save()
  .then(item => {
    res.send("Name saved to database");
  })
  .catch(err => {
    res.status(400).send("unable to save to database");
  });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

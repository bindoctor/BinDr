const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const sampleData = require("./sampleData");
const bodyParser = require("body-parser");
require("./models/user");
require("./models/bin");
require("./config/passport");

// The order of these statements is important
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./routes"));

const applyMorganMiddleware = require("./middleware/morganMiddleware");
const applyEnforceHttps = require("./config/applyEnforceHttps");
require("dotenv").config();

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
    helpers: {
      mapboxKey: function() {
        return process.env.MAPBOX_KEY;
      }
    }
  })
);

app.set("view engine", "handlebars");
applyEnforceHttps(app);
applyMorganMiddleware(app);

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/about", (request, response) => {
  response.render("about");
});

app.get("/api/sample-bins", (request, response) => {
  response.json(sampleData);
});

app.post("/api/bins", (request, response) => {
  const binRequest = response.req.body;
  Bin.create({}, {
    type: binRequest["bin[type]"],
    lng: binRequest["bin[lng]"],
    lat: binRequest["bin[lat]"]
  });
  // bin = {
  //   type: binRequest["bin[type]"],
  //   lng: binRequest["bin[lng]"],
  //   lat: binRequest["bin[lat]"]
  // };
  console.log("bin type", response.req.body["bin[type]"]);
  console.log("bin lng", response.req.body["bin[lng]"]);
  console.log("bin lat", response.req.body["bin[lat]"]);
});

const unknownEndpoint = (request, response) => {
  response.status(404).render("404");
};

app.use(unknownEndpoint);

module.exports = app;

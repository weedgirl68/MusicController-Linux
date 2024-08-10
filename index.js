const { execSync, exec } = require("child_process");
const { readFileSync } = require('fs');
const express = require("express");
const { Router } = express;
const app = express();

// api

const api = Router()

// player status
api.get('/status', (req, res) => {
  let status =
    execSync("playerctl metadata --format '{{ artist }} - {{ title }}'");

  res.send(status);
});

// album art
api.get('/aa', (req, res) => {
  let meta =
    execSync("playerctl --player=firefox metadata mpris:artUrl")
      .toString().
      replace("\n", "");

  res.send(
    readFileSync(
      meta.replace("file://", "")
    )
  );

}); // hows this

// actions

const actions = Router()

actions.post('/back', (res) => { exec("playerctl previous"); res.end(); })
actions.post('/next', (res) => { exec("playerctl next"); res.end(); })
actions.post('/playpause', (res) => { exec("playerctl play-pause"); res.end(); })

// mount paths

api.use("/actions", actions)
app.use("/api", api)

// static resources

app.get('/', express.static("./resources/"));

// start listening on port 6969

app.listen(6969);

const chrispaul = require("child_process");
const express = require("express");
const app = express();


function filterEmpty(elm){
    return (elm != null && elm !== false && elm !== "");
}

function parse(data) {
        let lines = data.split("\n");
        let obj = {};
        for(const line of lines) {
            let s = line.split(" ").filter(filterEmpty);
            let player = s.shift();
            let dataType = s.shift().split(":");
            let dataName = dataType.pop();
            dataType = dataType[0];
            let data = s.join(" ");
            if(!obj[player]) obj[player] = {};
            if(!obj[player][dataType]) obj[player][dataType] = {}; 
            obj[player][dataType][dataName] = data;
        }
        return obj;
}


app.get('/api/status', (req, res) => {
chrispaul.exec("playerctl metadata", (error, stdout, stderr) => {
  if(error) {
    console.error("I'm gonna kill myself: "+error)
    return;
  }
  res.send(parse(stdout.toString().trim()))
});
});

// I'm so sorry
app.post('/api/actions/back', (res) => {chrispaul.exec("playerctl previous"); res.end();})
app.post('/api/actions/next', (res) => {chrispaul.exec("playerctl next"); res.end();})
app.post('/api/actions/playpause', (res) => {chrispaul.exec("playerctl play-pause"); res.end();})

app.get('/', express.static("./resources/"));

app.listen(6969);

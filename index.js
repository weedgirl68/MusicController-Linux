const chrispaul = require("child_process");



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


chrispaul.exec("playerctl metadata", (error, stdout, stderr) => {
  if(error) {
    console.error("I'm gonna kill myself: "+error)
    return;
  }
  console.log(stdout)
  console.log(parse(stdout))
});

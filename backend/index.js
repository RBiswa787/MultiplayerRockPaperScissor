
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var games = {};
var game = {};
// Add messages when sockets open and close connections
io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);
  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
  socket.on("joinroom", data => {
    console.log(data);
    socket.join(data["code"]);
    initialiseGame(data["code"],data["name"]);
    io.to(data["code"]).emit("updateInit",games[data["code"]]);
    io.to(data["id"]).emit("greet",data["name"]);
  });
  socket.on("play", data =>{
    console.log("play");
    handleGame(data["code"],data["me"],data["choice"]);
  });
  socket.on("reset",data=>{
    console.log("reset request!");
    console.log(data);
    socket.to(data).emit("load",1);
  })
});
 

function handleGame(code, name, choice){
  if(games[code]["played"] == 0){
    console.log("firstplayer");
    if(games[code]["player1"]===name){
      if(choice==0){
        games[code]["player1choice"] = 0
      }
      else if(choice ==1){
        games[code]["player1choice"] = 1
      }
      else if(choice ==2){
        games[code]["player1choice"] = 2
      }
      games[code]["played"] = 1;
    }
    else{
      if(choice==0){
        games[code]["player2choice"] = 0
      }
      else if(choice ==1){
        games[code]["player2choice"] = 1
      }
      else if(choice ==2){
        games[code]["player2choice"] = 2
      }
      games[code]["played"] = 1;
    }
  }
  else{
    console.log("secondplayer");
    if(games[code]["player1"]===name){
      if(choice==0){
        games[code]["player1choice"] = 0
      }
      else if(choice ==1){
        games[code]["player1choice"] = 1
      }
      else if(choice ==2){
        games[code]["player1choice"] = 2
      }
      update(code);
      console.log(games[code]);
      io.to(code).emit("update",games[code]);
      if(games[code]["rounds"]==games[code]["round"]){
        if(games[code]["player1wins"]>games[code]["player2wins"]){
          io.to(code).emit("result",games[code]["player1"]);
          delete games.code;
        }
        else{
          io.to(code).emit("result",games[code]["player2"]);
          delete games.code;
        }
      }
      games[code]["played"] = 0;
    }
    else{
      if(choice==0){
        games[code]["player2choice"] = 0
      }
      else if(choice ==1){
        games[code]["player2choice"] = 1
      }
      else if(choice ==2){
        games[code]["player2choice"] = 2
      }
      update(code);
      console.log(games[code]);
      io.to(code).emit("update",games[code]);
      if(games[code]["rounds"]==games[code]["round"]){
        if(games[code]["player1wins"]>games[code]["player2wins"]){
          io.to(code).emit("result",games[code]["player1"]);
        }
        else{
          io.to(code).emit("result",games[code]["player2"]);
        }
      }
      games[code]["played"] = 0;
    }
  }
}
function update(code){
  console.log("updating");
  if(games[code]["player1choice"]==0 && games[code]["player2choice"] ==0){
  }
  else if(games[code]["player1choice"]==0 && games[code]["player2choice"] ==1){
    games[code]["round"] = games[code]["round"] + 1;
    games[code]["player2wins"] = games[code]["player2wins"] + 1;
  }
  else if(games[code]["player1choice"]==0 && games[code]["player2choice"] ==2){
    games[code]["round"] = games[code]["round"] + 1;
    games[code]["player1wins"] = games[code]["player1wins"] + 1;
  }
  else if(games[code]["player1choice"]==1 && games[code]["player2choice"] ==0){
    games[code]["round"] = games[code]["round"] + 1;
    games[code]["player1wins"] = games[code]["player1wins"] + 1;
  }
  else if(games[code]["player1choice"]==1 && games[code]["player2choice"] ==1){
  }
  else if(games[code]["player1choice"]==1 && games[code]["player2choice"] ==2){
    games[code]["round"] = games[code]["round"] + 1;
    games[code]["player2wins"] = games[code]["player2wins"] + 1;
  }
  else if(games[code]["player1choice"]==2 && games[code]["player2choice"] ==0){
    games[code]["round"] = games[code]["round"] + 1;
    games[code]["player2wins"] = games[code]["player2wins"] + 1;
  }
  else if(games[code]["player1choice"]==2 && games[code]["player2choice"] ==1){
    games[code]["round"] = games[code]["round"] + 1;
    games[code]["player1wins"] = games[code]["player1wins"] + 1;
  }
  else{
  }
}
function initialiseGame(code, name){
    if (code in games){
      games[code]["player2"] = name;
    }
    else{
      game["played"]=0;
      game["code"]= code;
      game["player1"]= name;
      game["player2"]="Waiting!";
      game["rounds"]= 5;
      game["round"]=0;
      game["player1wins"]=0;
      game["player2wins"]=0;
      game["player1choice"]="";
      game["player2choice"]="";
      games[code] = game;
      game = {};
    }
}


// Show the index.html by default
//app.get('/', (req, res) => res.sendFile('index.html'));

// Start the express server
http.listen(process.env.PORT || 80, function(){
  console.log('listening on *:80');
});
const socket = io.connect('http://localhost:4000');

document.addEventListener('DOMContentLoaded', startRoom);

function startRoom(){
  socket.on('connect', function(){
    if (ROOMID) {
      socket.emit('addPlayer', ROOMID);
      socket.on('start game', startGame)
    }
  });
}

function startGame(players) {
  console.log('Game started', players);
}

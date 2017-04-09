'use strict';

var startGameButtons = $('.js-start-game');

startGameButtons.on('click', startGame);

function startGame() {
  var url = '/room/' + generateRoomId();

  window.location.href = url;
}

function generateRoomId() {
  return Math.random().toString(36).slice(-4);
}
'use strict';

var socket = io.connect('http://localhost:4000');

document.addEventListener('DOMContentLoaded', startRoom);

function startRoom() {
  socket.on('connect', function () {
    if (ROOMID) {
      socket.emit('addPlayer', ROOMID);
      socket.on('start game', startGame);
    }
  });
}

function startGame(players) {
  console.log('Game started', players);
}
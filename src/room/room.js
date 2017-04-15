const socket = io.connect('http://localhost:4000');

document.addEventListener('DOMContentLoaded', startRoom);

function startRoom(){
  socket.on('start game', startGame)
  socket.on('connect', function(){
    if (ROOMID) {
      let playerId = getCookie('player_id');
      if (!playerId) {
        playerId = generateId(6);
        setCookie('player_id', playerId)
      }
      socket.emit('addPlayer', {ROOMID, playerId});
    }
  });
}

function startGame(people) {
  let playerId = getCookie('player_id');
  if (people.players.includes(playerId)) {
    console.log('You r player');
  } else {
    console.log('You r viewer');
  }

  console.log('Game started', people);
}

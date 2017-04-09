const startGameButtons = $('.js-start-game');

startGameButtons.on('click', startGame);

function startGame(){
  const url = `/room/${generateRoomId()}`;

  window.location.href = url;
}

function generateRoomId() {
  return Math.random().toString(36).slice(-4);
}

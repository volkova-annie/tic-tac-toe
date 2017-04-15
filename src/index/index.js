const startGameButtons = $('.js-start-game');

startGameButtons.on('click', createRoom);

function createRoom(){
  const url = `/room/${generateId(4)}`;
  console.log(url);
  window.location.href = url;
}

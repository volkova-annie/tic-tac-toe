const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
// const fs = require('fs');
const games = {};


app.use('/static', express.static('static'))

app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'ejs')

app.get('*', function (req, res) {
  res.status(200).render('index.ejs', {request: req});
});

// app.get('/room/:id', function (req, res) {
//   res.status(200).render('room.ejs', {request: req});
// })

io.on('connection', function (socket) {
  socket.on('addPlayer', function({ROOMID, playerId}) {
    console.log('playerId: ', playerId);
    console.log('ROOMID: ', ROOMID);
    if (games[ROOMID]) {
      const isPlayerIdExist = games[ROOMID].includes(playerId); //!!(games[ROOMID].find(id => id === playerId));
      if (!isPlayerIdExist) {
        games[ROOMID].push(playerId)
      }
      if (games[ROOMID].length >= 2) {
        console.log('start game: ', ROOMID);
        io.to(ROOMID).emit('start game', {
          players: [games[ROOMID][0], games[ROOMID][1]],
          viewers:games[ROOMID].slice(2),
        })
      }
    } else {
      games[ROOMID] = [playerId];
    }


    socket.join(ROOMID, function(){
      console.log('player added: ', ROOMID);
      io.to(ROOMID).emit('player added', socket.id);
    });
  });
});

server.listen(4000, function () {
  console.log('Server listening on port 4000!');
});

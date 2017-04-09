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

app.get('/', function (req, res) {
  res.status(200).render('index.ejs');
});

app.get('/room/:id', function (req, res) {
  res.status(200).render('room.ejs', {request: req});
})

io.on('connection', function (socket) {
  socket.on('addPlayer', function (ROOMID) {
    if (games[ROOMID]) {
      games[ROOMID].push(socket.id)
      if (games[ROOMID].length >= 2) {
        io.to(ROOMID).emit('start game', {
          player1:games[ROOMID][0],
          player2:games[ROOMID][1]
        })
      }
    } else {
      games[ROOMID] = [socket.id];
    }


    socket.join(ROOMID, function(){
      io.to(ROOMID).emit('player added', socket.id);
    });

  });
});

server.listen(4000, function () {
  console.log('Server listening on port 4000!');
});

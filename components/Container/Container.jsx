import React, {Component} from 'react';
import url from 'url';
import {Button, Room} from '../index';
import {getCookie, generateId, setCookie} from '../utils.js';

class Container extends Component {
  constructor(props){
    super(props);
    this.state={
      page: this.pathStartWith('/room') ? 'room' : 'index',
      roomId: this.getRoomIdFromUrl(),
      socket: io.connect('http://localhost:4000'),
      players: [],
    }
  }

  pathStartWith = (startString) => {
    const {pathname} = location;
    if (pathname.substring(0,startString.length) === startString) {
      return true
    } else {
      return false
    }
  }

  getRoomIdFromUrl = () => {
    const {pathname} = location;
    // const pathname = location.pathname
    const rex = /\/room\/(.*)$/gi;
    const roomId = pathname.replace(rex, '$1');
    return roomId;
  }

  createRoom = () => {
    const roomId = generateId(4);
    // this.setState({roomId, page:'room'})
    window.location.href = `/room/${roomId}`;
  }

  componentDidMount() {
    this.state.socket.on('start game', this.startGame)
    this.state.socket.on('connect', () => {
      if (this.state.roomId) {
        let playerId = getCookie('player_id');
        if (!playerId) {
          playerId = generateId(6);
          setCookie('player_id', playerId)
        }
        this.state.socket.emit('addPlayer', {ROOMID: this.state.roomId, playerId});
      }
    });
  }

  startGame = (people) => {
    let playerId = getCookie('player_id');
    if (people.players.includes(playerId)) {
      this.setState({players:people.players});
      console.log('You r player');
    } else {
      console.log('You r viewer');
    }
    console.log('Game started', people);
  }

  render(){
    switch (this.state.page) {
      case 'index':
        return <Button type="primary" onClick={this.createRoom}>Начать игру!</Button>
        break;
      case 'room':
        return <Room players={this.state.players} id={this.state.roomId} socket={this.state.socket}/>
        break
      default:
        return null;
    }

  }
}

export {Container};

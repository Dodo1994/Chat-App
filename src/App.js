import React from 'react';
import MessageList from './components/MessageList';
import Chatkit from '@pusher/chatkit-client'
import {tokenUrl, instanceLocator, randRoomId} from './config'
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';


class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       roomId: null,
       messages: [],
       joinableRooms: [],
       joinedRooms: []
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoomMultipart = this.subscribeToRoomMultipart.bind(this)
    this.getJoinableRooms = this.getJoinableRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }
  

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'dodo',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
  .then(currentUser => {
    this.currentUser=currentUser
    this.getJoinableRooms()
  })
}

getJoinableRooms(){
  this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err => {
      console.log(`Error getting joinable rooms: ${err}`)
    })
}

subscribeToRoomMultipart(roomId) {
  this.setState({
    messages: []
  })
  this.currentUser.subscribeToRoomMultipart({
    roomId: roomId,
    hooks: {
      onMessage: message => {
        this.setState({
          messages: [...this.state.messages, message]
        })
      }
    }
  }
)
.catch(err => {
  console.log('Error on connection', err)
})
.then(room => {
  this.setState({
    roomId: room.id
  })
  this.getJoinableRooms()
})
}

sendMessage(text) {
  this.currentUser.sendMessage({
    text: text,
    roomId: this.state.roomId
  })
}

createRoom(roomName){
  this.currentUser.createRoom({
    name: roomName
  }).then(room => {
    this.subscribeToRoomMultipart(room.id)
  })
  .catch(err => {
    console.log(`Error creating room ${err}`)
  })
}

  render() {
    return (
      <div className="app">
        <RoomList roomId= {this.state.roomId} 
        subscribeToRoom={this.subscribeToRoomMultipart}
        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={this.state.messages}
        roomId={this.state.roomId} />
        <SendMessageForm sendMessage={this.sendMessage}
        disabled={!this.state.roomId} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    )
  }
}

export default App


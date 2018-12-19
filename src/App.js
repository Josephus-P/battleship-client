import React, { Component } from 'react';
import io from 'socket.io-client';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8000');
    this.username = null;

    this.state = {
      username: '',
      isRegistered: false,
      chatPublic: []
    };
  }

  componentDidMount() {
    this.socket.on('new user connected', name => {
      console.log('user connected');
      const chatPublic = this.state.chatPublic.slice();
      chatPublic.push(`${name} has joined the room.`);
      console.log(name);
      this.setState({ chatPublic: chatPublic });
    });

    this.socket.on('user disconnected', name => {
      const chatPublic = this.state.chatPublic.slice();
      chatPublic.push(`${name} has left the room.`);
      console.log(name);
      this.setState({ chatPublic: chatPublic });
    });
  }

  inputHandler = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  registerUsername = event => {
    event.preventDefault();
    console.log(this.state.username);
    if (!this.state.isRegistered) {
      this.socket.emit('join public', this.state.username);
    }

    this.setState({ username: '', isRegistered: true });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="name-input">
            <form onSubmit={this.registerUsername}>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.inputHandler}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="chat-box">
            {this.state.isRegistered ? (
              <h1>Welcome {this.state.username}</h1>
            ) : null}
            {this.state.chatPublic.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

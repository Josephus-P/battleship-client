import React, { Component } from 'react';
import io from 'socket.io-client';
import Form from './components/form/form';
import ChatBox from './components/chatbox/chatbox';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8000');

    this.state = {
      username: null,
      usernameInput: '',
      chatInput: '',
      chatPublic: []
    };
  }

  componentDidMount() {
    this.socket.on('new user connected', name => {
      console.log('user connected');
      const chatPublic = [];
      this.state.chatPublic.forEach(entry => {
        chatPublic.push({ ...entry });
      });

      chatPublic.push({ username: name, message: 'has joined the room.' });
      console.log(name);
      this.setState({ chatPublic: chatPublic });
    });

    this.socket.on('public chat entry', entry => {
      const chatPublic = [];
      this.state.chatPublic.forEach(entry => {
        chatPublic.push({ ...entry });
      });

      chatPublic.push({ ...entry });
      this.setState({ chatPublic: chatPublic });
    });

    this.socket.on('user disconnected', name => {
      const chatPublic = this.state.chatPublic.slice();
      chatPublic.push({ username: name, message: 'has left the room.' });
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
    const username = this.state.usernameInput;

    if (!this.state.username) {
      this.socket.emit('join public', this.state.usernameInput);
    }

    this.setState({ username: username, usernameInput: '' });
  };

  submitPublicChat = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.username) {
      const chat = {
        username: this.state.username,
        message: this.state.chatInput
      };
      const chatPublic = [];

      this.state.chatPublic.forEach(entry => {
        chatPublic.push({ ...entry });
      });

      chatPublic.push(chat);

      this.socket.emit('public chat', chat);
      this.setState({ chatPublic: chatPublic, chatInput: '' });
    } else {
      this.setState({ chatInput: '' });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="name-input">
            <Form
              name="usernameInput"
              placeholder="Username"
              inputValue={this.state.usernameInput}
              inputHandler={this.inputHandler}
              onSubmit={this.registerUsername}
            />
          </div>
          <div className="chat-box">
            {this.state.username ? (
              <h1>Welcome {this.state.username}</h1>
            ) : null}
            <ChatBox
              chat={this.state.chatPublic}
              inputValue={this.state.chatInput}
              inputHandler={this.inputHandler}
              inputPlaceholder="Enter message"
              inputName="chatInput"
              formSubmit={this.submitPublicChat}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

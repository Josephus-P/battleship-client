import React, { Component } from 'react';
import io from 'socket.io-client';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Form from './components/form/form';
import ChatBox from './components/chatbox/chatbox';
import 'typeface-roboto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8000');

    this.state = {
      username: null,
      usernameInput: '',
      chatInput: '',
      users: [],
      publicChat: []
    };
  }

  componentDidMount() {
    this.socket.on('new user connected', name => {
      const publicChat = [];
      const users = this.state.users.slice();

      users.push(name);

      this.state.publicChat.forEach(entry => {
        publicChat.push({ ...entry });
      });

      publicChat.push({ username: name, message: 'has joined the room.' });

      this.setState({ users: users, publicChat: publicChat });
    });

    this.socket.on('update online user list', users => {
      console.log(users);
      this.setState({ users: users });
    });

    this.socket.on('public chat entry', entry => {
      const publicChat = [];
      this.state.publicChat.forEach(entry => {
        publicChat.push({ ...entry });
      });

      publicChat.push({ ...entry });
      this.setState({ publicChat: publicChat });
    });

    this.socket.on('user disconnected', name => {
      const users = this.state.users.filter(user => user !== name);
      const publicChat = this.state.publicChat.slice();
      publicChat.push({ username: name, message: 'has left the room.' });

      this.setState({ users: users, publicChat: publicChat });
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
      const publicChat = [];

      this.state.publicChat.forEach(entry => {
        publicChat.push({ ...entry });
      });

      publicChat.push(chat);

      this.socket.emit('public chat', chat);
      this.setState({ publicChat: publicChat, chatInput: '' });
    } else {
      this.setState({ chatInput: '' });
    }
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Grid container spacing={8}>
          <div>
            <Form
              name="usernameInput"
              placeholder="Username"
              inputValue={this.state.usernameInput}
              inputHandler={this.inputHandler}
              onSubmit={this.registerUsername}
            />
          </div>
          <div>
            {this.state.username ? (
              <h1>Welcome {this.state.username}</h1>
            ) : null}
            <ChatBox
              username={this.state.username}
              chat={this.state.publicChat}
              users={this.state.users}
              inputValue={this.state.chatInput}
              inputHandler={this.inputHandler}
              inputPlaceholder="Enter message"
              inputName="chatInput"
              formSubmit={this.submitPublicChat}
            />
          </div>
        </Grid>
      </div>
    );
  }
}

export default App;

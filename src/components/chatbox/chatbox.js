import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Form from '../form/form';

const TabContainer = ({ children, classes }) => {
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>{children}</CardContent>
    </Card>
  );
};

const styles = theme => ({
  chatbox: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
  card: {
    height: '20vh',
    overflowY: 'auto'
  },
  cardContent: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    overflowY: 'scroll'
  }
});

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    let users = this.props.username
      ? this.props.users.filter(user => user !== this.props.username)
      : null;
    let onlineUsers = [];

    if (users && users.length > 0) {
      onlineUsers = users.map((user, index) => (
        <Typography component="p" align="left" key={index}>
          {user}
        </Typography>
      ));
    } else {
      onlineUsers = (
        <Typography component="p" align="left">
          <em>No online users</em>
        </Typography>
      );
    }

    return (
      <div className={classes.chatbox}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            fullWidth
          >
            <Tab label="Online Players" />
            <Tab label="Public Chat" />
            <Tab label="Game Chat" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        >
          <TabContainer classes={classes}>{onlineUsers}</TabContainer>
          <TabContainer classes={classes}>
            {this.props.chat.map((entry, index) => (
              <Typography component="p" align="left" key={index}>
                <strong>
                  {entry.message === 'has joined the room.' ||
                  entry.message === 'has left the room.'
                    ? entry.username
                    : entry.username + ': '}
                </strong>{' '}
                {entry.message}
              </Typography>
            ))}
          </TabContainer>
          <TabContainer classes={classes} />
        </SwipeableViews>
        <Form
          name={this.props.inputName}
          inputValue={this.props.inputValue}
          placeholder={this.props.inputPlaceholder}
          inputHandler={this.props.inputHandler}
          onSubmit={this.props.formSubmit}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ChatBox);

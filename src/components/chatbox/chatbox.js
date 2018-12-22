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
    <Card className={classes}>
      <CardContent>{children}</CardContent>
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
    overflowY: 'scroll'
  }
});

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  render() {
    const { classes, theme } = this.props;
    console.log(classes);
    console.log(theme);
    return (
      <div className={classes.chatbox}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.tabValue}
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
          index={this.state.tabValue}
          onChangeIndex={this.handleChange}
        >
          <TabContainer classes={classes.card} />
          <TabContainer classes={classes.card}>
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
          <TabContainer classes={classes.card} />
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

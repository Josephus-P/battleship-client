import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  form: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    margin: theme.spacing.unit,
    width: '75%'
  }
});

const Form = props => {
  const { classes } = props;
  return (
    <form className={classes.form} onSubmit={props.onSubmit} autoComplete="off">
      <Input
        className={classes.input}
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        value={props.inputValue}
        onChange={props.inputHandler}
      />
      <Button className={classes.button} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default withStyles(styles)(Form);

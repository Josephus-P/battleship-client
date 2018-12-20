import React from 'react';

const Form = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        value={props.inputValue}
        onChange={props.inputHandler}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

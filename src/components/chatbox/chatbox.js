import React from 'react';
import Form from '../form/form';

const ChatBox = props => {
  return (
    <div className="chat-box">
      <div className="chat-box-entries">
        {props.chat.map((entry, index) => (
          <p key={index}>
            <strong>
              {entry.message === 'has joined the room.'
                ? entry.username
                : entry.username + ': '}
            </strong>{' '}
            {entry.message}
          </p>
        ))}
      </div>
      <Form
        name={props.inputName}
        inputValue={props.inputValue}
        placeholder={props.inputPlaceholder}
        inputHandler={props.inputHandler}
        onSubmit={props.formSubmit}
      />
    </div>
  );
};

export default ChatBox;

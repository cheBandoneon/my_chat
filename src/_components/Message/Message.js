import React from 'react';

function Message(props) {
  const {message, author, authorIsCurrentUser} = props;
  
  return (
    <div 
      className={`chat__message ${ authorIsCurrentUser ? 'chat__message--right' : ''}`} 
      key={message._id}>
      {message.content}
    </div>
  )
}

export default Message;
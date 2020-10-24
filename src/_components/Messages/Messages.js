import React from 'react';
import Message from '../Message/Message';  
import './messages.css';

function Messages(props) {
 
  const {messages, currentUser, otherUser} = props;

  return (
    <div className="chat__messages">
      {
        messages && currentUser
        ? 
          messages.map( (message) => {
            const authorIsCurrentUser = (message.from === currentUser.email);
            return <Message author={ authorIsCurrentUser ? currentUser : otherUser } authorIsCurrentUser={authorIsCurrentUser} message={message} />
          })
        :
        ''
      }
    </div>
  )
}

export default Messages;
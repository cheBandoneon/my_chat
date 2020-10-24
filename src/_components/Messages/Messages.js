import React from 'react';  
import './messages.css';

function Messages(props) {
 
  const {messages, currentUser} = props;

  return (
    <div className="chat__messages">
      {
        messages && currentUser
        ? 
          messages.map( (message) => {
            return <div className={`chat__message ${ message.author_id === currentUser._id ? 'chat__message--right' : ''}`} key={message._id}>{message.content}</div>
          })
        :
        ''
      }
    </div>
  )
}

export default Messages;
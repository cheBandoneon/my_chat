import React, {useEffect, useState} from 'react';
import {fetchConversation}          from '../../_services/messagesService';
import {withRouter}                 from 'react-router';
import './conversation.css';

function Conversation(props) {
  const conversationID = props.match.params.conversation_id;

  const {currentUser} = props;
  const [conversation, setConversation] = useState('');

  useEffect( () => {
    getConversation();
  }, [conversationID]);
  
  const getConversation = async () => {
    setConversation( await fetchConversation(conversationID) );
  }

  return (
    <div className="chat-wrapper">
      {
        conversation && conversation.messages 
        ? 
          conversation.messages.map( (message, index) => {
            return <div className={`chat__message ${ message.author_id === currentUser._id ? 'chat__message--right' : ''}`} key={message._id}>{message.content}</div>
          })
        :
        ''
      }
    </div>
  )
}

export default withRouter(Conversation);
import React, {useEffect, useState} from 'react';
import {fetchMessages, postMessage} from '../../_services/messagesService';
import Messages                     from '../Messages/Messages';
import TextBox                      from '../TextBox/TextBox';
import './chat.css';

function Chat(props) {
  
  const conversationID = props.match.params.conversation_id;
  const {currentUser} = props;
  const [messages, setMessages] = useState([]);

  useEffect( () => {
    getMessages();
  }, [conversationID]);
  
  const getMessages = async () => {
    setMessages( await fetchMessages(conversationID) );
  }

  const sendMessage = async (message) => {
    const response = await postMessage( conversationID, message, currentUser._id );
    response && response.data && setMessages(response.data);
  }

  return (
    <div className="chat-wrapper">
      <Messages messages={messages} currentUser={currentUser} />
      <TextBox sendMessage={sendMessage} />
    </div>
  )
}

export default Chat;
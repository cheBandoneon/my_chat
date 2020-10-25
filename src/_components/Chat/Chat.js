import React, {useEffect, useState}                     from 'react';
import {fetchMessages, postMessage, fetchConversation}  from '../../_services/messagesService';
import {fetchUsersByEmails}                             from '../../_services/userService';
import Messages                                         from '../Messages/Messages';
import TextBox                                          from '../TextBox/TextBox';
import './chat.css';

function Chat(props) {
  
  const conversationID = props.match.params.conversation_id;
  const {currentUser} = props;
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [conversation, setConversation] = useState('');

  useEffect( () => {
    getMessages();
  }, []);

  useEffect( () => {
    getConversation(); 
  },[]);

  useEffect( () => {
    getOtherUser();    
    return () => false;
  }, [conversation]);

  const getConversation = async () => {
    setConversation( await fetchConversation(conversationID) );
  }

  const getOtherUser = async () => {

    if ( ! conversation ) return ;

    const otherUserEmail  = conversation.people[0] === currentUser.email ? conversation.people[1] : conversation.people[0];  
    const otherUser = await fetchUsersByEmails([ otherUserEmail ]);
    
    setOtherUser( otherUser[0] );    
  }
  
  const getMessages = async () => {
    setMessages( await fetchMessages(conversationID) );
  }

  const sendMessage = async (message) => {
    const response = await postMessage( conversationID, message, currentUser.email, otherUser.email );
    setMessages([...messages, response]);
  }

  return (
    <div className="chat-wrapper">
      <Messages messages={messages} currentUser={currentUser} otherUser={otherUser} />
      <TextBox sendMessage={sendMessage} />
    </div>
  )
}

export default Chat;
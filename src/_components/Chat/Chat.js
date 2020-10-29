import React, {useEffect, useState}                     from 'react';
import {fetchMessages, postMessage, fetchConversation}  from '../../_services/messagesService';
import {fetchUsersByEmails}                             from '../../_services/userService';
import Messages                                         from '../Messages/Messages';
import TextBox                                          from '../TextBox/TextBox';
import Pusher                                           from 'pusher-js';
import './chat.css';

function Chat(props) {
  
  const conversationID                  = props.match.params.conversation_id;
  const {currentUser, pusherKey}        = props;
  const [messages, setMessages]         = useState([]);
  const [otherUser, setOtherUser]       = useState({});
  const [conversation, setConversation] = useState('');
  const pusher                          = new Pusher(pusherKey, { cluster: 'eu' });
  const channel                         = pusher.subscribe(`chat_${currentUser.email}`);

  useEffect( () => {
    setConversationToState(); 
  },[]);

  // After subscription succeeds, get messages history
  useEffect( () => {
    if( conversationID ) {
      channel.bind('pusher:subscription_succeeded', setMessageHistoryToState);
      return () => false;
    }
  }, [conversationID]);

  // Once messages are loaded, bind message event to channel.
  useEffect( () => {
    if( messages.length > 0 ) { 
      channel.bind('message', data => {
        setMessages([...messages, data.message]);
      });
      return () => false;
    }
  },[messages]);

  // Get the other user of the conversation
  useEffect( () => {
    setOtherUserToState();    
    return () => false;
  }, [conversation]);

  const setConversationToState = async () => {
    setConversation( await fetchConversation(conversationID) );
  }

  const setOtherUserToState = async () => {

    if ( ! conversation ) return ;

    const otherUserEmail  = conversation.people[0] === currentUser.email ? conversation.people[1] : conversation.people[0];  
    const otherUser = await fetchUsersByEmails([ otherUserEmail ]);
    
    setOtherUser( otherUser[0] );    
  }
  
  const setMessageHistoryToState = async () => {
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
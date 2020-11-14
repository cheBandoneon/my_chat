import React, {useEffect, useState}                     from 'react';
import {fetchMessages, postMessage, fetchConversation}  from '../../_services/messagesService';
import {fetchUsersByEmails}                             from '../../_services/userService';
import Messages                                         from '../Messages/Messages';
import TextBox                                          from '../TextBox/TextBox';
import './chat.css';

function Chat(props) {
  
  const conversationID                  = props.match.params.conversation_id;
  const {currentUser, pusher}        = props;
  const [messages, setMessages]         = useState([]);
  const [otherUser, setOtherUser]       = useState({});
  const [conversation, setConversation] = useState('');

  // On mount get Conversation and add to state
  useEffect( () => {
    setConversationToState(); 
  },[]);

  const setConversationToState = async () => {
    setConversation( await fetchConversation(conversationID) );
  }

  // After conversation is fetched, initialize channel
  useEffect( () => {
    if( conversationID) {
      initChannel();
      return () => false;
    }
  }, [messages,conversationID]);

  // Channel initialization
  const initChannel = async () => {
    
    // Subscribe to pusher Channel
    const channel = pusher.subscribe(`chat_${currentUser.email}`);

    // After subscription succeeds, fetch conversation messages from server and add them to state 
    await channel.bind('pusher:subscription_succeeded', setMessageHistoryToState);

    // Finally bind message event 
    channel.bind('message', onMessageSend);
  }

  // Fetch messages and add them to state
  const setMessageHistoryToState = async () => {
    setMessages( await fetchMessages(conversationID) );
  }

  // Update state with new message
  const onMessageSend = (data) => {
    setMessages([...messages, data.message]);
  }

  // Get the other user of the conversation
  useEffect( () => {
    setOtherUserToState();    
    return () => false;
  }, [conversation]);

  const setOtherUserToState = async () => {

    if ( ! conversation ) return ;

    const otherUserEmail  = conversation.people[0] === currentUser.email ? conversation.people[1] : conversation.people[0];  
    const otherUser = await fetchUsersByEmails([ otherUserEmail ]);
    
    setOtherUser( otherUser[0] );    
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
import React, {useEffect, useState} from 'react';
import {NavLink}                    from 'react-router-dom'
import Avatar                       from '../Avatar/Avatar';
import {fetchUsersByEmails}         from '../../_services/userService';
import Pusher                       from 'pusher-js';
import _                            from 'lodash';
import './contactList.css';

function ContactList(props) {

  const { conversations, pusherKey, user } = props;
  const [ currentUserContacts, setCurrentUserContacts ] = useState('');
  const [ unreadMessages, setUnReadMessages] = useState([]);

  useEffect( () => {
    if( conversations ) {
      getCurrentUserContacts();
      const pusher = new Pusher(pusherKey, {
        cluster: 'eu'
      });
      const channel = pusher.subscribe(`chat_${user.email}`);
      channel.bind('message', data => {
        setUnReadMessages([...unreadMessages, data.message.conversation_id]);
      });
    }
  }, [conversations]);

  const getCurrentUserContacts = async () => {
    const emails = mapConversationsToEmails();
    setCurrentUserContacts( await fetchUsersByEmails(emails) );
  };

  const mapConversationsToEmails = () => {
    return conversations.map( item => item.with_user );
  }

  const findUserByEmail = (email) => {
    return _.find(currentUserContacts, ['email', email]);
  }

  return (
    conversations && currentUserContacts 
    ? 
      conversations.map( (item) => {
        const {_id, nickname, picture} = findUserByEmail( item.with_user );
        const unreadClass = unreadMessages.find(i => i === item.conv_id) ? 'list__item--unread' : ''
      
        return(
          <li className={`list__item ${unreadClass}`} key={_id} id={_id}>
            <NavLink to={`/messages/${item.conv_id}`} className="list__link list__link--with-avatar">
              <Avatar url={picture} />
              <span className="list-item__text">{nickname}</span>
            </NavLink>
          </li>
        )
      })
    :
      ''
  )
}

export default ContactList;
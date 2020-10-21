import React, {useEffect, useState} from 'react';
import {NavLink}                       from 'react-router-dom'
import Avatar                       from '../Avatar/Avatar';
import {fetchUsersByEmails}         from '../../_services/userService';
import _                            from 'lodash';
import './friendList.css';

function FriendList(props) {

  const { friendItems, conversations } = props;
  const [ loggedUserFriends, setLoggedUserFriends ] = useState('');

  useEffect( () => {
    if( friendItems ) {
      getLoggedUserFriends();
    }
  }, [friendItems]);

  const getLoggedUserFriends = async () => {
    setLoggedUserFriends( await fetchUsersByEmails(friendItems) );
  };

  const getConversationIdFromFriendId = (friendId) => {
    const conversationId = _.find(conversations, ['user_id', friendId]) ? _.find(conversations, ['user_id', friendId]).conv_id : '';
    return conversationId;
  }
  
  return (
    loggedUserFriends ? 
      loggedUserFriends.map( (item) => {
        let localUserID = _.find(friendItems, ['email', item.email]).id;
        return(
          <li className="list__item" key={localUserID} id={localUserID}>
            <NavLink to={`/messages/${getConversationIdFromFriendId(localUserID)}`} className="list__link list__link--with-avatar">
              <Avatar url={item.picture} />
              <span className="list-item__text">{item.nickname}</span>
            </NavLink>
          </li>
        )
      })
      :
      ''
  )
}

export default FriendList;
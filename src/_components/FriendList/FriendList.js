import React, {useEffect, useState} from 'react';
import Avatar from '../Avatar/Avatar';
import {fetchUsersByEmails} from '../../_services/userService';
import './friendList.css';

function FriendList(props) {

  const { friendEmails } = props;
  const [ loggedUserFriends, setLoggedUserFriends ] = useState('');

  useEffect( () => {
    if( friendEmails ) {
      getLoggedUserFriends();
    }
  }, [friendEmails]);

  const getLoggedUserFriends = async () => {
    setLoggedUserFriends( await fetchUsersByEmails(friendEmails) );
  };
  
  return (
    loggedUserFriends ? 
      loggedUserFriends.map( item => {
        return(
          <li className="list__item" key={item.user_id} id={item.user_id}>
            <a href="#" className="list__link list__link--with-avatar">
              <Avatar url={item.picture} />
              <span className="list-item__text">{item.nickname}</span>
            </a>
          </li>
        )
      })
      :
      ''
  )
}

export default FriendList;
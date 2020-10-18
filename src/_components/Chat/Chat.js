import React, {useEffect, useState} from 'react';
import FriendList from '../FriendList/FriendList';
import _ from 'lodash';
import './chat.css';

function Chat(props) {

  const {user} = props;
  
  return (
    <div className="chat-wrapper">
      <div className="chat-sidebar">
        <h3 className="title title--medium">Your Friends</h3>
        {
          ! _.isEmpty(user)
          ?
          <div>
            <FriendList friendEmails={user.friends}/>
          </div>
          :
          ''
        }
        
      </div>
    </div>
  )
}

export default Chat;
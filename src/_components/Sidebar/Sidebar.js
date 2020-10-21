import React      from 'react';
import FriendList from '../FriendList/FriendList';
import {Link}     from 'react-router-dom';
import _          from 'lodash';

function Sidebar(props) {

  const {user} = props;

  return(
    <div className="chat-sidebar">
      <h1 className="App-logo"><Link to={'/'}>My Chat</Link></h1>
      <h3 className="title title--medium">Your Friends</h3>
      {
        ! _.isEmpty(user)
        ?
        <div>
          <FriendList friendItems={user.friends} conversations={user.conversations}/>
        </div>
        :
        ''
      }
    </div>
  )
}

export default Sidebar;
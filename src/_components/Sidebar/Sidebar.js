import React                            from 'react';
import ContactList                      from '../ContactList/ContactList';
import {Link, useHistory}               from 'react-router-dom';
import _                                from 'lodash';
import ContactSearch                    from '../ContactSearch/ContactSearch';
import { createConversation }           from '../../_services/messagesService';
import LogoutButton                     from '../Buttons/LogoutButton';
import './sidebar.css';

function Sidebar(props) {

  const {user}  = props;
  const history = useHistory();

  const onAddContact = async (contactEmail) => {
    const response = await createConversation( user.email, contactEmail );
    if( response._id ) {
      history.push(`/messages/${response._id}`);
    }
  }

  return(
    <div className="chat-sidebar">
      <h1 className="App-logo"><Link to={'/'}>My Chat</Link></h1>
      <div className="chat-sidebar__group">
        <h3 className="title title--medium">Search For Contacts</h3>
        <ContactSearch onAddContact={onAddContact} />
      </div>
      <div className="chat-sidebar__group">
      <h3 className="title title--medium">Your Contacts</h3>
      {
        ! _.isEmpty(user)
        ?
        
          <ContactList friendItems={user.friends} conversations={user.conversations}/>
        
        :
        'You don\'t have any contacts yet..'
      }
      </div>
      <LogoutButton />
    </div>
  )
}

export default Sidebar;
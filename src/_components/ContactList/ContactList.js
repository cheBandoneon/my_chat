import React, {useEffect, useState} from 'react';
import {NavLink}                       from 'react-router-dom'
import Avatar                       from '../Avatar/Avatar';
import {fetchUsersByEmails}         from '../../_services/userService';
import _                            from 'lodash';
import './contactList.css';

function ContactList(props) {

  const { conversations } = props;
  const [ currentUserContacts, setCurrentUserContacts ] = useState('');

  useEffect( () => {
    if( conversations ) {
      getCurrentUserContacts();
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
       
        return(
          <li className="list__item" key={_id} id={_id}>
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
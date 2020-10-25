import React, {useEffect, useState} from 'react';
import {debounce}                   from 'throttle-debounce';
import {searchUsers}                from '../../_services/userService';
import './contactSearch.css';

function ContactSearch(props) {
  const { onAddContact } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect( () => {
    if( searchQuery ) {
      getSearchResults();
    }
  }, [searchQuery]); 

  const getSearchResults = async () => {
    const results = await searchUsers(searchQuery);
    setSearchResults(results);
  }

  const debounceFunc = debounce(500, false, (searchQuery) => {
    setSearchQuery(searchQuery);
  });

  return (
    <div className="contacts-search">
      <input type="text" className="contacts-search__input" placeholder="Search for user" onChange={ e => debounceFunc(e.target.value) } />
      { 
        searchQuery 
        ? 
          <div className="contacts-search__results">
            {
              searchResults.length > 0
              ? 
                searchResults.map( item => {
                  return (
                    <div> <a href="#" onClick={ e => onAddContact( item.email ) }>{ item.email }</a></div>
                  )
                })
              :
              'No results'
            }
          </div>
        :
          ''
      }
    </div>
  )
}

export default ContactSearch;
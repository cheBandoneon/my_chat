import axios                                              from 'axios';
import {GET_USER, GET_USERS_BY_EMAILS, AUTH0_CREDS}       from '../constants';
import {getAuth0Token, fetchAuth0Token, removeAuth0Token} from './auth';

export const fetchUserByEmail = async ( email ) => {
  try {
    const response = await axios.get(`${GET_USER}?email=${email}`);
    return response.data ? response.data : '';
  } catch (error) {
    console.error(error);
  }
}

export const fetchAuth0Credentials = async () => {
  try {
    const response = await axios.get(`${AUTH0_CREDS}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchUsersByEmails = async ( friendItems, tries = 1 ) => {
  
  // If tried to fetch unsuccessfully more than 2 times then bail.
  if( tries > 2 ) {
    return false;
  }

  const emails = friendItems.map( item => item.email );
  
  const token = getAuth0Token() || await fetchAuth0Token();
  const config = {
    method: 'GET',
    headers: {'Authorization': `Bearer ${token}`},
    url: GET_USERS_BY_EMAILS,
    params: {
      emails: emails.join()
    }
  };

  try {
    const response = await axios(config);
    return response.data ? response.data : '';
  } catch (error) {
    // Most errors at this stage are probably due to invalid token. So clear the Token from Local Storage
    // and fetch again
    removeAuth0Token();
    fetchUsersByEmails(emails, ++tries);
  }
}
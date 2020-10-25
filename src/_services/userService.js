import axios                                              from 'axios';
import {GET_USER, GET_USERS_BY_EMAILS, AUTH0_CREDS, SEARCH_USERS}       from '../constants';

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

export const searchUsers = async (searchQuery) => {
  try {
    const response = await axios.get(`${SEARCH_USERS}?query=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchUsersByEmails = async ( emails ) => {

  if( emails.length == 0 ) return;
  
  try {
    const response = await axios.get(`${GET_USERS_BY_EMAILS}?emails=${emails.join()}`);
    return response.data ? response.data : '';
  } catch (error) {
    console.log(error);
  }
}
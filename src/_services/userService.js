import axios from 'axios';
import {GET_USER, GET_USERS_BY_EMAILS} from '../constants';
import {getAuth0Token,fetchAuth0Token} from './auth';

export const fetchUserByEmail = async ( email ) => {
  try {
    const response = await axios.get(`${GET_USER}?email=${email}`);
    return response.data ? response.data : '';
  } catch (error) {
    console.error(error);
  }
}

export const fetchUsersByEmails = async ( emails ) => {
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
    console.log(response.data);
    return response.data ? response.data : '';
  } catch (error) {
    console.error(error);
  }
}
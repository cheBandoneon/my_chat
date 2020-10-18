import axios    from 'axios';
import {OAUTH}  from '../constants';


export const getAuth0Token = () => {
  const token = localStorage.getItem('my_chat_auth0_token');
  return token ? token : false;
}

export const setAuth0Token = (token) => {
  localStorage.setItem('my_chat_auth0_token', token);
  return getAuth0Token();
}

export const removeAuth0Token = () => {
  localStorage.removeItem('my_chat_auth0_token');
}

export const fetchAuth0Token = async () => {
  try {
    const response = await axios.get(`${OAUTH}`);
    return setAuth0Token(response.data.access_token);
  } catch (error) {
    return false;
  }
}
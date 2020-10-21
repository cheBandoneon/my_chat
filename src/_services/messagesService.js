import axios                         from 'axios';
import {GET_CONVERSATION}            from '../constants';

export const fetchConversation = async ( conversationID ) => {
  try {
    const response = await axios.get(`${GET_CONVERSATION}?id=${conversationID}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
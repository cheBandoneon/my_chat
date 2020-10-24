import axios                              from 'axios';
import {GET_CONVERSATION, GET_MESSAGES, POST_MESSAGE}   from '../constants';

export const fetchMessages = async ( conversationID ) => {
  try {
    const response = await axios.get(`${GET_MESSAGES}?id=${conversationID}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchConversation = async ( conversationID ) => {
  try {
    const response = await axios.get(`${GET_CONVERSATION}?id=${conversationID}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const postMessage = async ( conversationID, message, fromEmail, toEmail ) => {
  try {
    const config = {
      method: 'POST',
      url: POST_MESSAGE,
      data: {
        message: {
          conversation_id: conversationID,
          from: fromEmail,
          to: toEmail,
          content: message
        }
      }
    };

    const res = await axios(config);
    return res.data;
  }
  catch(error) {
    console.log(error);
  }
}
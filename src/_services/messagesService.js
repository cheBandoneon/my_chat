import axios                              from 'axios';
import {GET_MESSAGES, POST_MESSAGE}   from '../constants';

export const fetchMessages = async ( conversationID ) => {
  try {
    const response = await axios.get(`${GET_MESSAGES}?id=${conversationID}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const postMessage = async ( conversationID, message, authorID ) => {
  console.log(authorID);
  try {
    const config = {
      method: 'POST',
      url: POST_MESSAGE,
      params: {
        conv_id: conversationID
      },
      data: {
        message: {
          author_id: authorID,
          content: message
        }
      }
    };

    return await axios(config);
  }
  catch(error) {
    console.log(error);
  }
}
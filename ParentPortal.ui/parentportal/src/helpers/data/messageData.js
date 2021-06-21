import axios from 'axios';
import { baseUrl } from '../config.json';

const messagesUrl = `${baseUrl}/messages`;

const getMessages = () => new Promise((resolve, reject) => {
  axios.get(`${messagesUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const addMessage = (data) => new Promise((resolve, reject) => {
  const newObj = {
    user_id: data.dbUser.id,
    text: data.text,
    title: data.title
  };
  return axios.post(`${messagesUrl}`, newObj).then(resolve).catch((error) => reject(error));
});

export default { getMessages, addMessage };

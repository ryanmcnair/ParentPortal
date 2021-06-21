import axios from 'axios';
import { baseUrl } from '../config.json';

const messagesUrl = `${baseUrl}/messages`;

const getMessages = () => new Promise((resolve, reject) => {
  axios.get(`${messagesUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default { getMessages };

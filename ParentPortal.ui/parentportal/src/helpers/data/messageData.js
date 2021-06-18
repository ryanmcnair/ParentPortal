import axios from 'axios';
import { baseUrl } from '../config.json';

const messagesUrl = `${baseUrl}/messages`;

const getIncomingMessages = (id) => new Promise((resolve, reject) => {
  axios.get(`${messagesUrl}/${id}/inbox`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getOutgoingMessages = (id) => new Promise((resolve, reject) => {
  axios.get(`${messagesUrl}/${id}/sent`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default {
  getIncomingMessages, getOutgoingMessages
};

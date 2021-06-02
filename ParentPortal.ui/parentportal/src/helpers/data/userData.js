import axios from 'axios';
import { baseUrl } from '../config.json';

const userUrl = `${baseUrl}/users`;

const getUserByFBUid = (fbUid) => new Promise((resolve, reject) => {
  axios.get(`${userUrl}/fb/${fbUid}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export default { getUserByFBUid };

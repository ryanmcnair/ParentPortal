import axios from 'axios';
import { baseUrl } from '../config.json';

const messageCommentsUrl = `${baseUrl}/messagecomments`;

const getCommentsByMessage = (id) => new Promise((resolve, reject) => {
  axios.get(`${messageCommentsUrl}/message/${id}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const deleteComment = (id) => axios.delete(`${messageCommentsUrl}/${id}`);

export default {
  getCommentsByMessage, deleteComment
};

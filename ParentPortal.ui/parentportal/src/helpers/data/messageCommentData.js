import axios from 'axios';
import { baseUrl } from '../config.json';

const messageCommentsUrl = `${baseUrl}/messagecomments`;

const getCommentsByMessage = (id) => new Promise((resolve, reject) => {
  axios.get(`${messageCommentsUrl}/message/${id}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const deleteComment = (id) => axios.delete(`${messageCommentsUrl}/${id}`);

const addComment = (data) => new Promise((resolve, reject) => {
  const newObj = {
    message_id: data.message.id,
    user_id: data.dbUser.id,
    comment: data.comment
  };
  console.warn('message comment data', newObj);
  axios.post(`${messageCommentsUrl}`, newObj).then(resolve).catch((error) => reject(error));
});

export default {
  getCommentsByMessage, deleteComment, addComment
};

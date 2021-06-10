import axios from 'axios';
import { baseUrl } from '../config.json';

const commentsUrl = `${baseUrl}/comments`;

const getCommentsByAssignment = (id) => new Promise((resolve, reject) => {
  axios.get(`${commentsUrl}/assignment/${id}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const addComment = (data) => new Promise((resolve, reject) => {
  const newObj = {
    assignment_id: data.assignment.id,
    user_id: data.dbUser.id,
    comment: data.comment
  };
  axios.post(`${commentsUrl}`, newObj).then(resolve).catch((error) => reject(error));
});

const deleteComment = (id) => axios.delete(`${commentsUrl}/${id}`);

export default {
  getCommentsByAssignment, addComment, deleteComment
};

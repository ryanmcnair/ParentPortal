import axios from 'axios';
import { baseUrl } from '../config.json';

const likesUrl = `${baseUrl}/likes`;

const getLikesByAssignment = (id) => new Promise((resolve, reject) => {
  axios.get(`${likesUrl}/assignment/${id}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getLikesByAssignmentAndUser = (assignmentId, userId) => new Promise((resolve, reject) => {
  axios.get(`${likesUrl}/assignment/${assignmentId}/${userId}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const addLike = (data) => new Promise((resolve, reject) => {
  console.warn('like data', data);
  const newObj = {
    assignment_id: data.assignment.id,
    user_id: data.dbUser.id,
  };
  axios.post(`${likesUrl}`, newObj).then(resolve).catch((error) => reject(error));
});

const deleteLike = (id) => axios.delete(`${likesUrl}/${id}`);

export default {
  getLikesByAssignment, addLike, deleteLike, getLikesByAssignmentAndUser
};

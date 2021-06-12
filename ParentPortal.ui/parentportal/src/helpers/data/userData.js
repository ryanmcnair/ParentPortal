import axios from 'axios';
import { baseUrl } from '../config.json';

const userUrl = `${baseUrl}/users`;

const getUserByFBUid = (fbUid) => new Promise((resolve, reject) => {
  axios.get(`${userUrl}/fb/${fbUid}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getUnregisteredUsers = () => new Promise((resolve, reject) => {
  axios.get(`${userUrl}/unregistered`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getUsersById = (id) => new Promise((resolve, reject) => {
  axios.get(`${userUrl}/profile/${id}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const updateUsers = (data) => new Promise((resolve, reject) => {
  console.warn('user update data', data);
  const newObj = {
    classroom_id: data.classroom_id,
    first_name: data.first_name,
    last_name: data.last_name,
    is_teacher: data.is_teacher,
    is_parent: data.is_parent,
    is_admin: data.is_admin,
    student_id: data.student_id,
    fb_uid: data.fb_uid,
    email: data.email,
    is_registered: true
  };
  axios.patch(`${userUrl}/${data.id}/update`, newObj).then(resolve).catch((error) => reject(error));
});

const deleteUser = (id) => axios.delete(`${userUrl}/${id}`);

export default {
  getUserByFBUid, getUnregisteredUsers, updateUsers, deleteUser, getUsersById
};

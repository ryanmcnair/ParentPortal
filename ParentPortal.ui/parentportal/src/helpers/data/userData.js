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

const updateUsers = (data) => new Promise((resolve, reject) => {
  const newObj = {
    classroom_id: data,
    first_name: data,
    last_name: data,
    is_teacher: data,
    is_parent: data,
    is_admin: data,
    student_id: data,
    fb_uid: data,
    email: data,
    is_registered: data
  };
  axios.patch(`${userUrl}/${data}/update`, newObj).then(resolve).catch((error) => reject(error));
});

const deleteUser = (id) => axios.delete(`${userUrl}/${id}`);

export default {
  getUserByFBUid, getUnregisteredUsers, updateUsers, deleteUser
};

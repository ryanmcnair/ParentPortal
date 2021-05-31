import axios from 'axios';
import { baseUrl } from '../config.json';

const classroomUrl = `${baseUrl}/classrooms`;

const getAllClassrooms = () => new Promise((resolve, reject) => {
  axios.get(`${classroomUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default { getAllClassrooms };

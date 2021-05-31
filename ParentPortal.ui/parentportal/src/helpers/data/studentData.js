import axios from 'axios';
import { baseUrl } from '../config.json';

const studentUrl = `${baseUrl}/students`;

const getStudentsByClassroom = (classroomId) => new Promise((resolve, reject) => {
  axios.get(`${studentUrl}/${classroomId}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default { getStudentsByClassroom };

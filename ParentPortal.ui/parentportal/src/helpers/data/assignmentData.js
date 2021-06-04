import axios from 'axios';
import { baseUrl } from '../config.json';

const assignmentsUrl = `${baseUrl}/assignments`;

const getAllAssignmentsByClassroom = (id) => new Promise((resolve, reject) => {
  axios.get(`${assignmentsUrl}/classroom/${id}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

export default { getAllAssignmentsByClassroom };

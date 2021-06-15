import axios from 'axios';
import { baseUrl } from '../config.json';

const assignmentsUrl = `${baseUrl}/assignments`;

const getAllAssignmentsByClassroom = (id) => new Promise((resolve, reject) => {
  axios.get(`${assignmentsUrl}/classroom/${id}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const addAssignment = (data) => new Promise((resolve, reject) => {
  const newObj = {
    classroom_id: data.dbUser.classroom_id,
    teacher_id: data.dbUser.id,
    pdf_url: data.pdf_url,
    date_due: data.date_due,
    text: data.text,
    title: data.title
  };
  return axios.post(`${assignmentsUrl}`, newObj).then(resolve).catch((error) => reject(error));
});

const updateAssignment = (data) => axios.patch(`${assignmentsUrl}/${data.assignmentId}/update`, {
  assignmentId: data.assignmentId,
  classroom_id: data.dbUser.classroom_id,
  teacher_id: data.dbUser.id,
  pdf_url: data.pdf_url,
  date_due: data.date_due,
  text: data.text,
  title: data.title
});

const deleteAssignment = (id) => axios.delete(`${assignmentsUrl}/${id}`);

export default {
  getAllAssignmentsByClassroom, addAssignment, updateAssignment, deleteAssignment
};

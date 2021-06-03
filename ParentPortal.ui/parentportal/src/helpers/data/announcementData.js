import axios from 'axios';
import { baseUrl } from '../config.json';

const announcementUrl = `${baseUrl}/announcements`;

const getAllAnnouncements = () => new Promise((resolve, reject) => {
  axios.get(`${announcementUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getParentAnnouncements = () => new Promise((resolve, reject) => {
  axios.get(`${announcementUrl}/parents`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const addAnnouncement = (data) => new Promise((resolve, reject) => {
  const newObj = {
    school_id: 1,
    publisher_id: data.dbUser.id,
    pdf_url: data.pdf_url,
    title: data.title,
    text: data.text,
    staff_only: data.staff_only
  };
  axios.post(`${announcementUrl}`, newObj).then(resolve).catch((error) => reject(error));
});

const deleteAnnouncement = (id) => axios.delete(`${announcementUrl}/${id}`);

const updateAnnouncement = (data) => new Promise((resolve, reject) => {
  const newObj = {
    school_id: 1,
    publisher_id: data.dbUser.id,
    pdf_url: data.pdf_url,
    title: data.title,
    text: data.text,
    staff_only: data.staff_only
  };
  axios.patch(`${announcementUrl}/${data.announcementId}/update`, newObj).then(resolve).catch((error) => reject(error));
});

export default {
  getAllAnnouncements, getParentAnnouncements, addAnnouncement, deleteAnnouncement, updateAnnouncement
};

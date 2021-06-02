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

export default { getAllAnnouncements, getParentAnnouncements };

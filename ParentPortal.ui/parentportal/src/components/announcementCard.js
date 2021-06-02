/* eslint-disable react/prop-types */
import React from 'react';

export default function AnnouncementCard({ announcement }) {
  return (
    <div className='product-card' style= {{ width: '75%' }}>
        <div className='card m-2'>
          <img src={announcement.pdf_url} alt=''></img>
          <h1>Announcement</h1>
          <h3 className='card-title'>{announcement.text}</h3>
          <p>Date added: {announcement.date_added}</p>
        </div>
        </div>
  );
}

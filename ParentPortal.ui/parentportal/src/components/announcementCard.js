/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';

import Modal from './modal';
import AnnouncementFormUpdate from '../views/announcementFormUpdate';

export default function AnnouncementCard({ announcement, dbUser }) {
  React.useState(dbUser);
  React.useState(announcement);

  return (
    <div style= {{ width: '50%' }}>
        <div className='card m-2'>
          <img src={announcement.pdf_url} alt=''></img>
          <h1>{announcement.title}</h1>
          <h3 className='card-title'>{announcement.text}</h3>
          <p>Date added: {announcement.date_added}</p>
          {dbUser.is_admin ? <Modal title={'Update/Delete'} buttonLabel={'Update/Delete'}>
                    {<AnnouncementFormUpdate dbUser={dbUser} announcement={announcement} />}
                  </Modal> : <div></div>}
        </div>
        </div>
  );
}

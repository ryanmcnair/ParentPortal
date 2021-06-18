/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';

import Modal from './modal';
import AnnouncementFormUpdate from '../views/announcementFormUpdate';

export default function AnnouncementCard({
  announcement, dbUser, deleteThis, updateThis
}) {
  React.useState(dbUser);
  React.useState(announcement);

  const dateAdded = new Date(announcement.date_added);

  return (
    <div>
        <div className='card m-2'>
          <h1>{announcement.title}</h1>
          <h3 className='card-title'>{announcement.text}</h3>
          <img src={announcement.pdf_url} alt=''></img>
          <p>Date added: {dateAdded.toDateString()}</p>
          {dbUser?.is_admin ? <Modal title={'Update/Delete'} buttonLabel={'Update/Delete'}>
                    {<AnnouncementFormUpdate dbUser={dbUser} announcement={announcement} deleteThis={deleteThis} updateThis={updateThis}/>}
                  </Modal> : <div></div>}
        </div>
        </div>
  );
}

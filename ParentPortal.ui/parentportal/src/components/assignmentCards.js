/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';

import Modal from './modal';
import AssignmentFormUpdate from '../views/assignmentFormUpdate';

export default function AssignmentCard({
  assignment, dbUser, deleteThis, updateThis
}) {
  React.useState(dbUser);
  React.useState(assignment);

  const dateAdded = new Date(assignment.date_added);
  const dateDue = new Date(assignment.date_due);

  return (
    <div>
        <div className='card m-2'>
          <img src={assignment.pdf_url} alt=''></img>
          <h1>{assignment.title}</h1>
          <h3 className='card-title'>{assignment.text}</h3>
          <p>Date added: {dateAdded.toDateString()}</p>
          <p>Date Due: {dateDue.toDateString()}</p>
          {dbUser.is_teacher ? <Modal title={'Update/Delete'} buttonLabel={'Update/Delete'}>
                    {<AssignmentFormUpdate dbUser={dbUser} assignment={assignment} deleteThis={deleteThis} updateThis={updateThis}/>}
                  </Modal> : <div></div>}
        </div>
        </div>
  );
}

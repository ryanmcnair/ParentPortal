import React from 'react';

export default class Profile extends React.Component {
    state = {};

    render() {
      return (
            <>
            <div className='waiting'>
            <h1>Profile Under Review</h1>
            <p>Thanks for registering!</p>
            <p>Your site administrator is currently reviewing your registration. Please check back soon.</p>
            </div>
            </>
      );
    }
}

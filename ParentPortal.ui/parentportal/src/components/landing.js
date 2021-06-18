import React from 'react';
import Auth from './auth';

export default class Landing extends React.Component {
    state = {};

    render() {
      return (
            <div className='landing'>
            <h1>Welcome to the Parent Portal</h1>
            <p>First time users, please register</p>
            <Auth />
            </div>
      );
    }
}

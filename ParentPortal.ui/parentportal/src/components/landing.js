import React from 'react';
import Auth from './auth';

export default class Landing extends React.Component {
    state = {};

    render() {
      return (
            <>
            <h1>Landing Page</h1>
            <Auth />
            </>
      );
    }
}

import React from 'react';
import Sidebar from '../components/sideBar';

export default class Messages extends React.Component {
    state = {};

    render() {
      return (
            <>
            <Sidebar />
            <h1>Messages Page</h1>
            </>
      );
    }
}

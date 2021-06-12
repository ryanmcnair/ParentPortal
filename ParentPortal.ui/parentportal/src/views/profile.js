/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'reactstrap';
import userData from '../helpers/data/userData';

export default class Profile extends React.Component {
    state = {
      dbUser: this.props.dbUser,
      unregisteredUsers: [],
      profile: []
    };

    componentDidMount() {
      this.getTheUnregisteredUsers();
      this.getUsersByTheirId(this.state.dbUser?.id);
    }

    getTheUnregisteredUsers = () => {
      userData.getUnregisteredUsers().then((response) => {
        this.setState({
          unregisteredUsers: response,
        });
      });
    }

    getUsersByTheirId = (id) => {
      userData.getUsersById(id).then((response) => {
        this.setState({
          profile: response
        });
      });
    }

    approveUser = (id) => {
      userData.updateUsers(id).then(() => {
        this.getTheUnregisteredUsers();
      });
    }

    deleteUser = (id) => {
      userData.deleteUser(id).then(() => {
        this.getTheUnregisteredUsers();
      });
    }

    render() {
      const { unregisteredUsers, dbUser, profile } = this.state;
      const renderApprovals = () => unregisteredUsers?.map((user) => (
            <>
            <div key={user.id}>Parent: {user.first_name} {user.last_name} --- Student: {user.student_name} --- Class: {user.class_name}</div>
            <p></p>
            <p></p>
            <p></p>
            <Button color='success' onClick={() => (this.approveUser(user))}>Approve</Button> <Button color='danger' onClick={() => (this.deleteUser(user.id))}>Deny</Button>
            </>
      ));
      return (
            <>
            <h1>Profile Page</h1>
            {dbUser?.is_admin ? <div>{renderApprovals()}</div> : <div></div>}
            <div className='profile-card'>
                <p>Name: {profile.first_name} {profile.last_name}</p>
                <p>Email address: {profile.email}</p>
                <p>Your student: {profile.student_name}</p>
                <p>Your class: {profile.class_name}</p>
            </div>
            </>
      );
    }
}

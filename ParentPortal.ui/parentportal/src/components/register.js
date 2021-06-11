/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'reactstrap';
import { baseUrl } from '../helpers/config.json';
import classroomData from '../helpers/data/classroomData';
import studentData from '../helpers/data/studentData';

class Registration extends React.Component {
    state = {
      classroom: [],
      students: [],
      selectedClassroom: 0,
      selectedStudent: 0
    };

    componentDidMount() {
      this.getTheClassrooms();
    }

    componentDidUpdate() {
      this.getTheStudents(this.state.selectedClassroom);
    }

    // Get classrooms and map them to a dropdown
    getTheClassrooms = () => {
      classroomData.getAllClassrooms().then((response) => {
        this.setState({
          classroom: response,
        });
      });
    }
    // Get students and map them to a dropdown

    getTheStudents = (classroomId) => {
      studentData.getStudentsByClassroom(classroomId).then((response) => {
        this.setState({
          students: response,
        });
      });
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.type !== 'text' ? parseInt(e.target.value, 10) : e.target.value
      });
    }

    loginClickEvent = (e) => {
      e.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((cred) => {
        const user = cred.additionalUserInfo.profile;
        if (cred.additionalUserInfo.isNewUser) {
          const userInfo = {
            classroom_id: this.state.selectedClassroom,
            first_name: user.given_name,
            last_name: user.family_name,
            is_teacher: false,
            is_parent: true,
            is_admin: false,
            student_id: this.state.selectedStudent,
            fb_uid: cred.user.uid,
            email: user.email,
            is_registered: false,
          };
          axios.post(`${baseUrl}/users`, userInfo);
        }
      });
      this.props.history.push('/');
    };

    render() {
      const classroomOptions = () => this.state.classroom.map((room) => (
        <option key={room.id}
        type='number'
        name='selectedClassroom'
        value={room.id}
        onChange={this.handleChange}>{room.class_name}</option>
      ));
      const studentOptions = () => this.state.students.map((child) => (
        <option key={child.id}
        type='number'
        name='selectedStudent'
        value={child.id}
        onChange={this.handleChange}>{child.student_name}</option>
      ));
      return (
            <>
            <h1>Registration page</h1>
            <Form>
                <div className='classChoice'>
                 <h3>Choose your class:</h3>
                    <select type='number' value={this.state.classroom.id} name='selectedClassroom' onChange={this.handleChange} required>
                    <option value='' disabled selected hidden>Classroom</option>
                    {classroomOptions()}
                    </select>
                </div>
                <div className='studentChoice'>
                    <h3>Choose your student:</h3>
                    <select type='number' value={this.state.students.id} name='selectedStudent' onChange={this.handleChange} required>
                    <option value='' disabled selected hidden>Student</option>
                    {studentOptions()}
                    </select>
                </div>
                <br/>
                <Button color="danger" href='#' onClick={this.loginClickEvent}>
                  Submit and Sign In
                </Button>
            </Form>
            </>
      );
    }
}

export default withRouter(Registration);

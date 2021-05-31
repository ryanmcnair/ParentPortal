import React from 'react';
import { Form } from 'reactstrap';
import classroomData from '../helpers/data/classroomData';
import studentData from '../helpers/data/studentData';

export default class Registration extends React.Component {
    state = {
      classroom: [],
      students: [],
      selectedClassroom: 0
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
                    <select type='number' value={this.state.classroom.id} name='selectedClassroom' onChange={this.handleChange} required>
                    <option value='' disabled selected hidden>Student</option>
                    {studentOptions()}
                    </select>
                </div>
            </Form>
            </>
      );
    }
}

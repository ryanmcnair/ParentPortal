/* eslint-disable react/prop-types */
import React from 'react';
import assignmentData from '../helpers/data/assignmentData';
import Modal from '../components/modal';
import AssignmentForm from './assignmentForm';

export default class Assignments extends React.Component {
    state = {
      dbUser: this.props.dbUser,
      assignments: []
    };

    componentDidMount() {
      this.getClassroomAssignments();
    }

    getClassroomAssignments = () => {
      assignmentData.getAllAssignmentsByClassroom(this.state.dbUser.classroom_id).then((response) => {
        this.setState({
          assignments: response
        });
      });
    }

    addAssignment = (things) => {
      console.warn('assignment parent things', things);
      assignmentData.addAssignment(things).then((response) => {
        this.setState({
          assignments: response
        });
      });
      this.getClassroomAssignments();
    }

    render() {
      const { dbUser } = this.state;
      let buttonRender;
      if (dbUser.is_teacher === true) {
        buttonRender = (<Modal title={'Add Assignment'} buttonLabel={'Add Assignment'}>
        {<AssignmentForm dbUser={dbUser} addThis={this.addAssignment}/>}
      </Modal>);
      } else {
        buttonRender = (<div></div>);
      }
      return (
            <>
            <h1>Assignments</h1>
            {buttonRender}
            </>
      );
    }
}

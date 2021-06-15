/* eslint-disable react/prop-types */
import React from 'react';
import assignmentData from '../helpers/data/assignmentData';
import Modal from '../components/modal';
import AssignmentForm from './assignmentForm';
import AssignmentCard from '../components/assignmentCards';

export default class Assignments extends React.Component {
    state = {
      dbUser: this.props.dbUser,
      assignments: [],
      counter: 0
    };

    componentDidMount() {
      if (this.props.dbUser) {
        this.getClassroomAssignments();
      }
    }

    getClassroomAssignments = () => {
      assignmentData.getAllAssignmentsByClassroom(this.props.dbUser?.classroom_id).then((response) => {
        this.setState({ counter: this.state.counter + 1 });
        this.setState({ assignments: response }, () => console.warn('state', this.state));
      });
    }

    addAssignment = (state) => {
      assignmentData.addAssignment(state).then(() => {
        this.getClassroomAssignments();
      });
    }

    removeAssignments = (id) => {
      assignmentData.deleteAssignment(id).then(() => {
        this.getClassroomAssignments();
      });
    }

    updateAssignments = (update) => {
      console.warn('update', update);
      assignmentData.updateAssignment(update).then(() => {
        this.getClassroomAssignments();
      });
    }

    render() {
      const { dbUser, assignments } = this.state;
      let buttonRender;
      if (dbUser?.is_teacher === true) {
        buttonRender = (<Modal title={'Add Assignment'} buttonLabel={'Add Assignment'}>
        {<AssignmentForm dbUser={dbUser} addThis={this.addAssignment}/>}
      </Modal>);
      } else {
        buttonRender = (<div></div>);
      }
      const renderAllAssignments = () => assignments?.map((assignment) => (<AssignmentCard key={assignment.id} assignment={assignment} dbUser={dbUser} deleteThis={this.removeAssignments} updateThis={this.updateAssignments} />));
      return (
        <>
            <h1>Assignments</h1>
            <div className='rendercards'>
              {buttonRender}
              <div id="counter">{this.state.counter}</div>
              {renderAllAssignments()}

            </div>
            </>
      );
    }
}

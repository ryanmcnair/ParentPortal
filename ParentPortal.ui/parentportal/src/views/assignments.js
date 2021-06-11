/* eslint-disable react/prop-types */
import React from 'react';
import assignmentData from '../helpers/data/assignmentData';
import Modal from '../components/modal';
import AssignmentForm from './assignmentForm';
import AssignmentCard from '../components/assignmentCards';
import Loader from '../components/loader';

export default class Assignments extends React.Component {
    state = {
      dbUser: this.props.dbUser,
      assignments: [],
      loading: true
    };

    componentDidMount() {
      this.getClassroomAssignments();
    }

    setLoading = () => {
      this.timer = setInterval(() => {
        this.setState({ loading: false });
      }, 1000);
    }

    getClassroomAssignments = () => {
      assignmentData.getAllAssignmentsByClassroom(this.state.dbUser.classroom_id).then((response) => {
        this.setState({
          assignments: response
        });
      });
      this.setLoading();
    }

    addAssignment = (things) => {
      assignmentData.addAssignment(things).then(() => {
        this.getClassroomAssignments();
      });
    }

    removeAssignments = (id) => {
      assignmentData.deleteAssignment(id).then(() => {
        this.getClassroomAssignments();
      });
    }

    updateAssignments = (update) => {
      assignmentData.updateAssignment(update).then(() => {
        this.getClassroomAssignments();
        this.setLoading();
      });
    }

    render() {
      const { dbUser, assignments, loading } = this.state;
      let buttonRender;
      if (dbUser.is_teacher === true) {
        buttonRender = (<Modal title={'Add Assignment'} buttonLabel={'Add Assignment'}>
        {<AssignmentForm dbUser={dbUser} addThis={this.addAssignment}/>}
      </Modal>);
      } else {
        buttonRender = (<div></div>);
      }
      const renderAllAssignments = () => assignments?.map((assignment) => (<AssignmentCard key={assignment.id} assignment={assignment} dbUser={dbUser} deleteThis={this.removeAssignments} updateThis={this.updateAssignments} />));
      return (
        <>
        { loading ? (<Loader />)
          : (<>
            <h1>Assignments</h1>
            <div className='rendercards'>
              {buttonRender}
              {renderAllAssignments()}

            </div>
            </>)
            }
            </>
      );
    }
}

/* eslint-disable react/prop-types */
import React from 'react';
import assignmentData from '../helpers/data/assignmentData';

export default class Assignments extends React.Component {
    state = {
      dbUser: this.props.dbUser,
      assments: []
    };

    componentDidMount() {
      this.getClassroomAssignments();
    }

    getClassroomAssignments = () => {
      assignmentData.getAllAssignmentsByClassroom(this.state.dbUser.classroom_id).then((response) => {
        this.setState({
          assments: response
        });
      });
    }

    render() {
      return (
            <>
            <h1>Assignments Page</h1>
            </>
      );
    }
}

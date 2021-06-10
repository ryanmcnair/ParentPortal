/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'reactstrap';
import Modal from './modal';
import AssignmentFormUpdate from '../views/assignmentFormUpdate';
import commentData from '../helpers/data/commentData';

export default class AssignmentCard extends React.Component {
  state = {
    dbUser: this.props.dbUser,
    assignment: this.props.assignment,
    comments: [],
    comment: ''
  }

  componentDidMount() {
    this.getComments(this.state.assignment.id);
  }

  getComments = (id) => {
    commentData.getCommentsByAssignment(id).then((response) => {
      this.setState({
        comments: response
      });
    });
  }

  postComment = (comment) => {
    commentData.addComment(comment).then(() => {
      this.getComments(this.state.assignment.id);
    });
  }

  removeComment = (id) => {
    commentData.deleteComment(id).then(() => {
      this.getComments(this.state.assignment.id);
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.postComment(this.state);
    this.setState({ comment: '' });
  }

  render() {
    const { assignment, dbUser, comments } = this.state;
    const dateAdded = new Date(assignment.date_added);
    const dateDue = new Date(assignment.date_due);

    const renderComments = () => comments?.map((comment) => (
    <>
    <h5>{comment.first_name} {comment.last_name}:</h5>
    <p key={comment.id} >{comment.comment}</p>
    {dbUser.last_name === comment.last_name ? <Button className='btn-danger' onClick={() => this.removeComment(comment.id)}>X</Button> : <div></div>}
    </>));
    return (
    <div>
        <div className='card m-2'>
          <img src={assignment.pdf_url} alt=''></img>
          <h1>{assignment.title}</h1>
          <h2 className='card-title'>{assignment.text}</h2>
          <p>Date added: {dateAdded.toDateString()}</p>
          <p>Date Due: {dateDue.toDateString()}</p>
          {dbUser.is_teacher ? <Modal title={'Update/Delete'} buttonLabel={'Update/Delete'}>
                    {<AssignmentFormUpdate dbUser={dbUser} assignment={assignment} deleteThis={this.props.deleteThis} updateThis={this.props.updateThis}/>}
                  </Modal> : <div></div>}
          <div className='comment-section'>
            <h3>Comments</h3>
            <p>{renderComments()}</p>
            <form onSubmit={this.handleSubmit} >
              <input style= {{ width: '90%' }} type='text' name='comment' placeholder='add a comment...' value={this.state.comment} onChange={this.handleChange}></input>
              <button style= {{ width: '9%' }}>Post</button>
            </form>
          </div>
        </div>
    </div>
    );
  }
}

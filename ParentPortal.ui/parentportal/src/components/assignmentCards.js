/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'reactstrap';
import Modal from './modal';
import AssignmentFormUpdate from '../views/assignmentFormUpdate';
import commentData from '../helpers/data/commentData';
import likeData from '../helpers/data/likeData';

export default class AssignmentCard extends React.Component {
  state = {
    dbUser: this.props.dbUser,
    comments: [],
    comment: '',
    likes: [],
    like: '',
    userLikes: ''
  }

  componentDidMount() {
    this.getComments(this.props.assignment.id);
    this.getLikes(this.props.assignment.id);
    this.getUserLikes(this.props.assignment.id, this.state.dbUser.id);
  }

  // Comments stuff below:

  getComments = (id) => {
    commentData.getCommentsByAssignment(id).then((response) => {
      this.setState({
        comments: response
      });
    });
  }

  postComment = (comment) => {
    commentData.addComment(comment).then(() => {
      this.getComments(this.props.assignment.id);
    });
  }

  removeComment = (id) => {
    commentData.deleteComment(id).then(() => {
      this.getComments(this.props.assignment.id);
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

  // Likes stuff is below this line:

  getLikes = (id) => {
    likeData.getLikesByAssignment(id).then((response) => {
      this.setState({
        likes: response
      });
    });
  }

  getUserLikes = (assignmentid, userid) => {
    likeData.getLikesByAssignmentAndUser(assignmentid, userid).then((response) => {
      this.setState({
        userLikes: response
      });
    });
  }

  postLike = (like) => {
    likeData.addLike(like).then(() => {
      this.getUserLikes(this.props.assignment.id, this.state.dbUser.id);
      this.getLikes(this.props.assignment.id);
    });
  }

  deleteLike = (id) => {
    likeData.deleteLike(id).then(() => {
      this.getUserLikes(this.props.assignment.id, this.state.dbUser.id);
      this.getLikes(this.props.assignment.id);
    });
  }

  handleLikeSubmit = (e) => {
    e.preventDefault();
    this.postLike(this.state);
  }

  handleLikeDelete = (e) => {
    e.preventDefault();
    this.deleteLike(this.state.userLikes[0].id);
  }

  render() {
    const {
      dbUser, comments, userLikes, likes
    } = this.state;

    const { assignment } = this.props;

    const dateAdded = new Date(assignment.date_added);
    const dateDue = new Date(assignment.date_due);

    // const checkLikeUsers = (like) => like.user_id === dbUser.id;

    const renderLikes = () => userLikes?.map((like) => (
      <>
      <div key={like.id} className='fas fa-check'></div>
      </>
    ));

    const renderLikesNames = () => likes?.map((like) => (
      <>
      <div key={like.id}>{like.first_name} {like.last_name}</div>
      </>
    ));

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
          {dbUser.is_teacher ? <Modal title={'View Acknowledgments'} buttonLabel={'View Acknowledgments'}>
                    <div>{renderLikesNames()}</div>
                  </Modal> : <div></div>}
          {userLikes?.length
            ? <Button onClick={this.handleLikeDelete} color='success'>{renderLikes()}</Button>
            : <Button color='warning' onClick={this.handleLikeSubmit}>Acknowledge</Button>}
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

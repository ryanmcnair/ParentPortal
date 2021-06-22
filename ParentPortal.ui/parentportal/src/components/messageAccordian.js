/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import messageCommentData from '../helpers/data/messageCommentData';

export default class MessageAccordian extends Component {
  state={
    message: [],
  }

  componentDidMount() {
    this.setState({
      message: this.props.message,
      dbUser: this.props.dbUser
    });
    this.getComments(this.props.message.id);
  }

  getComments = (id) => {
    messageCommentData.getCommentsByMessage(id).then((response) => {
      this.setState({
        comments: response
      });
    });
  }

  removeComment = (id) => {
    messageCommentData.deleteComment(id).then(() => {
      this.getComments(this.props.message.id);
    });
  }

  postComment = (comment) => {
    messageCommentData.addComment(comment).then(() => {
      this.getComments(this.props.message.id);
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
    const { message, dbUser } = this.props;
    const { comments } = this.state;
    const renderComments = () => comments?.map((comment) => (
        <>
        <div className='messageCommentBox'>
        <h5 className='commentName'>{comment?.first_name} {comment?.last_name}:</h5>
          <div className='commentAndDelete'>
            <p key={comment?.id} >{comment?.comment}</p>
            {dbUser?.last_name === comment?.last_name ? <Button className='btn-danger' onClick={() => this.removeComment(comment?.id)}>X</Button> : <div></div>}
          </div>
        </div>
        </>));
    return (
            <>
            <div className='messageBox'>
              <Accordion style= {{ width: '60%' }}>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <div className='accordianTitle'>
                            <div>{message?.title}</div>
                            <div>posted by: {message?.first_name} {message?.last_name}  {dbUser?.last_name === message?.last_name ? <Button className='btn-danger' onClick={() => this.props.deleteThis(message.id)}>X</Button> : <div></div>}</div>
                         </div>
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div>{message?.text}</div>
                        <br/>
                        <br/>
                        <div>{renderComments()}</div>
                        <br/>
                        <form onSubmit={this.handleSubmit} >
                            <input style= {{ width: '90%' }} type='text' name='comment' placeholder='add a comment...' value={this.state.comment} onChange={this.handleChange}></input>
                            <button style= {{ width: '9%' }}>Post</button>
                        </form>
                    </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
            </>
    );
  }
}

/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';

export default class AssignmentFormUpdate extends React.Component {
    state = {
      assignmentId: this.props.assignment?.id || '',
      dbUser: this.props.dbUser,
      title: this.props.assignment?.title || '',
      text: this.props.assignment?.text || '',
      pdf_url: this.props.assignment?.pdf_url || '',
      date_due: this.props.assignment?.date_due || ''
    };

    handleChange = (e) => {
      if (e.target.name === 'pdf_url') {
        this.setState({ pdf_url: '' });
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`parent-portal/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);
        imageRef.put(e.target.files[0]).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((pdf_url) => {
            this.setState({ pdf_url });
          });
        });
      } else {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.updateThis(this.state);
      this.props.toggle();
    }

    render() {
      return (
            <>
            <div className='assignment-form'>
            <Form style= {{ width: '75%' }} onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Text</Label>
                    <Input type='textarea' name='text' value={this.state.text} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>PDF/Image:</Label>
                    <br/>
                    <Input type='file' name='pdf_url' onChange={this.handleChange}/>
                </FormGroup>
                <br />
                <FormGroup>
                    <Label>Date Due:</Label>
                    <br/>
                    <input type='date' name='date_due' value={this.state.date_due} onChange={this.handleChange}/>
                </FormGroup>
                <br/>
                <Button className='mt-3'>Submit</Button>
                <br/>
                <Button className='mt-3' color="danger" onClick={() => this.props.deleteThis(this.state.assignmentId)}>Delete</Button>
            </Form>
            </div>
            </>
      );
    }
}

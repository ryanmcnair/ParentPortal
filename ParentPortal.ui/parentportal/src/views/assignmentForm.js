/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';

export default class AssignmentForm extends React.Component {
    state = {
      dbUser: this.props.dbUser,
      pdf_url: '',
      text: '',
      title: '',
      date_due: ''
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
      this.props.addThis(this.state);
      this.props.toggle();
    }

    render() {
      return (
            <>
            <div className='assignment-form'>
            <Form style= {{ width: '75%' }} onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input type='text' name='title' onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Text</Label>
                    <Input type='textarea' name='text' onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>PDF/Image:</Label>
                    <br/>
                    <Input type='file' name='pdf_url' onChange={this.handleChange}/>
                </FormGroup>
                <br />
                <FormGroup>
                    <Label>Due Date:</Label>
                    <br/>
                    <input type='date' name='date_due' onChange={this.handleChange}/>
                </FormGroup>
                <br/>
                <Button className='mt-3'>Submit</Button>
            </Form>
            </div>
            </>
      );
    }
}

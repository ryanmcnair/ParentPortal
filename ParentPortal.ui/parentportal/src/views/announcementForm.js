/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/storage';

export default class AnnouncementForm extends React.Component {
    state = {
      dbUser: this.props.dbUser,
      title: '',
      text: '',
      pdf_url: '',
      staff_only: false
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

    toggleChange = () => {
      this.setState({
        staff_only: !this.state.staff_only,
      });
    }

    render() {
      return (
            <>
            <h1>Announcements</h1>
            <div className='announcement-form'>
            <Form style= {{ width: '50%' }} onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input type='text' name='title' onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Text</Label>
                    <Input type='textarea' name='text' onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Add image:</Label>
                    <br/>
                    <Input type='file' name='pdf_url' onChange={this.handleChange}/>
                </FormGroup>
                <br/>
                <FormGroup>
                    <Label check>
                        <Input type='checkbox' name='staff_only' defaultChecked={this.state.staff_only} onChange={this.toggleChange}/>{' '}
                        Staff Only?
                    </Label>
                </FormGroup>
                <br/>
                <Button className='mt-3'>Submit</Button>
            </Form>
            </div>
            </>
      );
    }
}

/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';

export default class messageAddForm extends Component {
    state = {
      dbUser: this.props.dbUser,
      text: '',
      title: ''
    };

      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

      handleSubmit = (e) => {
        e.preventDefault();
        this.props.addThis(this.state);
        this.props.toggle();
      }

      render() {
        return (
            <div>
                <Form style= {{ width: '75%' }} onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input type='text' name='title' onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Text</Label>
                    <Input type='textarea' name='text' onChange={this.handleChange}/>
                </FormGroup>
                <br/>
                <Button className='mt-3'>Submit</Button>
            </Form>
            </div>
        );
      }
}

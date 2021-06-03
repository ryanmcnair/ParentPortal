/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import announcementData from '../helpers/data/announcementData';

export default class AnnouncementFormUpdate extends React.Component {
    state = {
      announcementId: this.props.announcement?.id || '',
      dbUser: this.props.dbUser,
      title: this.props.announcement?.title || '',
      text: this.props.announcement?.text || '',
      pdf_url: this.props.announcement?.pdf_url || '',
      staff_only: false
    };

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      announcementData.updateAnnouncement(this.state);
      this.props.toggle();
    }

    removeAnnouncement = () => {
      announcementData.deleteAnnouncement(this.state.announcementId).then(() => {
        this.props.onUpdate?.(this.state.announcementId);
      });
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
                    <Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Text</Label>
                    <Input type='textarea' name='text' value={this.state.text} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>PDF/Image URL</Label>
                    <Input type='url' name='pdf_url' value={this.state.pdf_url} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label check>
                        <Input type='checkbox' name='staff_only' defaultChecked={this.state.staff_only} onChange={this.toggleChange}/>{' '}
                        Staff Only?
                    </Label>
                </FormGroup>
                <br/>
                <Button className='mt-3'>Submit</Button>
                <br/>
                <Button className='mt-3' color="danger" onClick={this.removeAnnouncement}>Delete</Button>
            </Form>
            </div>
            </>
      );
    }
}

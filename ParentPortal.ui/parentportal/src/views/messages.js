/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import messageData from '../helpers/data/messageData';
import MessageAccordian from '../components/messageAccordian';
import Modal from '../components/modal';
import MessageAddForm from './messageAddForm';

export default class Messages extends Component {
  state={}

  componentDidMount() {
    this.setState({
      dbUser: this.props.dbUser
    });
    this.getTheMessages();
  }

  getTheMessages = () => {
    messageData.getMessages().then((response) => {
      this.setState({
        messages: response
      });
    });
  }

  addMessage = (state) => {
    messageData.addMessage(state).then(() => {
      this.getTheMessages();
    });
  }

  render() {
    const { messages, dbUser } = this.state;
    const renderTheMessages = () => messages?.map((message) => (<MessageAccordian key={message.id} message={message}/>));
    return (
      <div>
        <Modal title={'New Post'} buttonLabel={'New Post'}>
          {<MessageAddForm dbUser={dbUser} addThis={this.addMessage}/>}
        </Modal>
        {renderTheMessages()}
      </div>
    );
  }
}

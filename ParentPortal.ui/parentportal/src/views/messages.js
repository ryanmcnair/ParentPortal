/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import messageData from '../helpers/data/messageData';
import MessageAccordian from '../components/messageAccordian';

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

  render() {
    const { messages } = this.state;
    const renderTheMessages = () => messages?.map((message) => (<MessageAccordian key={message.id} message={message}/>));
    return (
      <div>
        {renderTheMessages()}
      </div>
    );
  }
}

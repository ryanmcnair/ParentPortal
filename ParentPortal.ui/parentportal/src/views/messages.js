/* eslint-disable react/prop-types */
import React from 'react';
import Sidebar from '../components/sideBar';
import messageData from '../helpers/data/messageData';

export default class Messages extends React.Component {
    state = {
      dbUser: [],
      incomingMessages: [],
      outgoingMessages: []
    };

    componentDidMount() {
      this.setState({
        dbUser: this.props.dbUser
      });
      if (this.state.dbUser) {
        this.getUserMessages();
        this.getSentMessages();
      }
    }

    getUserMessages = () => {
      messageData.getIncomingMessages(this.props.dbUser?.id).then((response) => {
        this.setState({
          incomingMessages: response
        });
      });
    }

    getSentMessages = () => {
      messageData.getOutgoingMessages(this.props.dbUser?.id).then((response) => {
        this.setState({
          outgoingMessages: response
        });
      });
    }

    render() {
      return (
            <>
            <Sidebar />
            <h1>Messages Page</h1>
            </>
      );
    }
}

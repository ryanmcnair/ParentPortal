/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

export default class MessageAccordian extends Component {
  state={
    messages: [],
  }

  componentDidMount() {
    this.setState({
      messages: this.props.messages
    });
  }

  render() {
    const { message, dbUser } = this.props;
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
                    <Card.Body>{message?.text}</Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
            </>
    );
  }
}

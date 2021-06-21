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
    const { message } = this.props;
    return (
            <>
            <div className='messageBox'>
              <Accordion style= {{ width: '60%' }}>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {message?.title}
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

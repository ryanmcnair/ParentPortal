/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Tab, Nav, Button } from 'react-bootstrap';
import Conversations from './conversations';

const conversationsKey = 'conversations';

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState(conversationsKey);

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
    <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
      <Nav variant="tabs" className="justify-content-center">
        <Nav.Item>
          <Nav.Link eventKey={conversationsKey}>Conversations</Nav.Link>
        </Nav.Item>
      </Nav>
      <Button >
          New Conversation
      </Button>
      <Tab.Content className="border-right overflow-auto flex-grow-1">
        <Tab.Pane eventKey={conversationsKey}>
          <Conversations />
        </Tab.Pane>
      </Tab.Content>

    </Tab.Container>

  </div>
  );
}

import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';

const conversationsKey = 'conversations';
const contactsKey = 'contacts';

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState(conversationsKey);

  return (
        <div style={{ width: '250px' }} className='d-flex flex-column'>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant='tabs' className='justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey={conversationsKey}> Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={contactsKey}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Tab.Container>
        </div>
  );
}

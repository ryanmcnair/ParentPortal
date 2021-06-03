/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';

const AppModal = (props) => {
  const { buttonLabel, className, title } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className='m-2'>
      <Button color='dark' onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        size='lg'
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{React.cloneElement(props.children, { toggle })}</ModalBody>
      </Modal>
    </div>
  );
};

export default AppModal;

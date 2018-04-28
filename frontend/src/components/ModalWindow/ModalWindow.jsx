import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ModalWindow = (props) => {
  const { deleteModal, closeModal, handleRemoveClick, value } = props;
 return (
  <Modal size="mini" open={deleteModal} onClose={closeModal}>
    <Modal.Header>
      {`Delete ${value} account`}
    </Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete account?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={closeModal} content='No' />
        <Button positive onClick={handleRemoveClick} icon='checkmark' labelPosition='right' content='Yes' />
      </Modal.Actions>
    </Modal>
 );
}

ModalWindow.propTypes = {
  deleteModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default ModalWindow;

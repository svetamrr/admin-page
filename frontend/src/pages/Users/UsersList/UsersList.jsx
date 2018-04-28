import React, { Component } from 'react';
import { Table, Button, Icon, Modal } from 'semantic-ui-react';

import ModalWindow from './../../../components/ModalWindow';
import './style.css';

class UsersList extends Component {
  state = {
    userRemoveId: '',
  }

  goToEditUserPage = (username) => () => {
    this.props.history.push(`/users/${username}`);  
  }

  goToAddUserPage = () => {
    this.props.history.push('/users/addUser');
  }

  requestRemoveUser = (id) => () => {
    this.setState({ userRemoveId: id });
    this.props.onToggleDeleteUserModal(true);
  }

  closeModal = () => {
    this.props.onToggleDeleteUserModal(false);
  }

  getTableHeader = () => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Username</Table.HeaderCell>
        <Table.HeaderCell>First name</Table.HeaderCell>
        <Table.HeaderCell>Last name</Table.HeaderCell>
        <Table.HeaderCell>Groups</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );

  getTableBody = (users) => (
    <Table.Body>
      {users.map((user) => (
        <Table.Row
          key={user._id}
        >
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.firstName}</Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
          <Table.Cell>
            {user.groups.length}
          </Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>
            <Button
              inverted
              color='blue'
              onClick={this.goToEditUserPage(user.username)}>
              <Icon name='edit' />
              Edit
            </Button>
            <Button inverted color='red' onClick={this.requestRemoveUser(user._id)}>
              <Icon name='remove' />
              Remove
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );

  handleRemoveUserClick = () => {
    this.props.onRemoveUser(this.state.userRemoveId);
  }

  getModalWindow = () => (
    <ModalWindow 
      deleteModal={this.props.app.deleteUserModal}
      closeModal={this.closeModal}
      handleRemoveClick={this.handleRemoveUserClick}
      value="user"
    />
  );

  render() {
    const { users } = this.props;
    return (
      <div>
        <Button inverted className="add" color='green' onClick={this.goToAddUserPage}>
          <Icon name='add' />
            Add
        </Button>
        <Table stackable selectable>
          {this.getTableHeader()}
          {this.getTableBody(users)}
        </Table>
        {this.getModalWindow()}
      </div>
    );
  }
}

export default UsersList;

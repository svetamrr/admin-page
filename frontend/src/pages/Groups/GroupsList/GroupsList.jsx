import React, { Component } from 'react';
import { Table, Button, Icon, Modal } from 'semantic-ui-react';

import ModalWindow from './../../../components/ModalWindow';
import './style.css';

class GroupsList extends Component {
  state = {
    groupRemoveId: '',
  }

  goToEditGroupPage = (name) => () => {
    this.props.history.push(`/groups/${name}`);
  }

  goToAddGroupPage = () => {
    this.props.history.push('/groups/addGroup');
  }

  requestRemoveGroup = (id) => () => {
    this.setState({ groupRemoveId: id });
    this.props.onToggleDeleteUserModal(true);
  }

  closeModal = () => {
    this.props.onToggleDeleteUserModal(false);
  }

  handleRemoveGroupClick = () => {
    this.props.onRemoveGroup(this.state.groupRemoveId);
  }

  getTableHeader = () => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Users</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );

  getTableBody = (groups) => {
    return (
      <Table.Body>
      { groups.map((group) => (
        <Table.Row key={group._id}>
        <Table.Cell>{group.name}</Table.Cell>
        <Table.Cell>{group.title}</Table.Cell>
        <Table.Cell>
          {group.users.length}
        </Table.Cell>
        <Table.Cell>
        <Button 
            inverted 
            color='blue' 
            onClick={this.goToEditGroupPage(group.name)}>
            <Icon name='edit' />
            Edit
          </Button>
          <Button inverted color='red' onClick={this.requestRemoveGroup(group._id)}>
            <Icon name='remove' />
            Remove
          </Button>
        </Table.Cell>
      </Table.Row>
      )) }
    </Table.Body>
    )
  };

  getModalWindow = () => (
    <ModalWindow 
      deleteModal={this.props.app.deleteUserModal}
      closeModal={this.closeModal}
      handleRemoveClick={this.handleRemoveGroupClick}
      value="group"
    />
  );

  render() {
    const { groups } = this.props;
    return (
      <div>
        <Button inverted className="add" color='green' onClick={this.goToAddGroupPage}>
          <Icon name='add' />
            Add
        </Button>
        <Table stackable selectable>
          {this.getTableHeader()}
          {this.getTableBody(groups)}
        </Table>
        {this.getModalWindow()}
      </div>
    );
  }
}

export default GroupsList;

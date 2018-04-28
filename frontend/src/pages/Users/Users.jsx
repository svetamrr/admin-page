import React, { Component } from 'react';

import Search from './../../components/Search';
import UsersList from './UsersList';

class Users extends Component {
  componentWillMount() {
    this.props.onGetUsers();
  }

  render() {
    return (
      <div>
        <Search type="users" />
        <UsersList users={this.props.users} />
      </div>
    );
  }
};

export default Users;

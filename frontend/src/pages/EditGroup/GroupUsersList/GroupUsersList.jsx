import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, List, Header, Button } from 'semantic-ui-react';

import './style.css';

class GroupUsersList extends Component {
  state = {
    otherUsers: [],
    groupUsers : [],
  }

  static propTypes = {
    groupInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      users: PropTypes.arrayOf(PropTypes.string),
    }),
    users: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    users: [],
  }

  componentWillMount() {
    this.transformGroupUsers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.transformGroupUsers(nextProps);
  }

  transformGroupUsers = (props) => {
    const { groupInfo, users } = props;

    const groupUsers = groupInfo.users.map((userId) => {
      return users.find((user) => {
        return user._id === userId;
      });
    });

    const otherUsers = users.filter((user) => {
      const index = groupInfo.users.findIndex((groupUsers) => {
        return user._id === groupUsers;
      })
      return index === -1;
    });

    this.setState({
      otherUsers,
      groupUsers,
    })
  }

  addGroupFromUser = (userId) => () => {
    this.props.onAddUserToGroup(this.props.groupInfo._id, userId);
  }

  removeUserFromGroup = (userId) => () => {
    this.props.onRemoveUserFromGroup(this.props.groupInfo._id, userId)
  }

  render() {
    const { otherUsers, groupUsers } = this.state;
    return(
      <Grid.Column>
          <Grid columns='equal'>
            <Grid.Row>
                <List divided relaxed>
                  { groupUsers.map((user) => (
                    <List.Item key={user._id} className="users">
                      <List.Icon name='group' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header>
                          <Link to={`/users/${user.username}`}>{user.username}</Link>
                        </List.Header>
                        <List.Description>{user.firstName} {user.lastName}</List.Description>
                        <List.Description>{user.email}</List.Description>
                      </List.Content>
                      <List.Content floated='right'>
                        <Button negative onClick={this.removeUserFromGroup(user._id)}>Remove</Button>
                      </List.Content>  
                  </List.Item>
                  ))}
                </List> 
            </Grid.Row>
            <Header as="h3" className="users-header">All users</Header>
            <Grid.Row>
                <List divided relaxed>
                  { otherUsers.map((user) => (
                    <List.Item key={user._id} className="users">
                    <List.Icon name='group' size='large' verticalAlign='middle' />
                    <List.Content>
                      <List.Header>
                        <Link to={`/users/${user.username}`}>{ user.username }</Link>
                        </List.Header>
                      <List.Description>{user.firstName} {user.lastName}</List.Description>
                      <List.Description>{user.email}</List.Description>
                    </List.Content>
                    <List.Content floated='right'>
                      <Button positive onClick={this.addGroupFromUser(user._id)}>Add</Button>
                    </List.Content>
                  </List.Item>
                  ))}
                </List>
            </Grid.Row>
          </Grid>
        </Grid.Column>
    )
  }
}

export default GroupUsersList;

import React, { Component } from 'react';
import { Grid, List, Header, Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.css';

class UserGroupsList extends Component {
  state = {
    otherGroups: [],
    userGroups: [],
  }
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    groups: [],
  }

  componentWillMount() {
    this.transformUserGroups(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.transformUserGroups(nextProps);
  }

  transformUserGroups = (props) => {
    const { userInfo, groups } = props;

    const userGroups = userInfo.groups.map((groupId) => {
      return groups.find((group) => {
        return group._id === groupId;
      });
    });

    const otherGroups = groups.filter((group) => {
      const index = userInfo.groups.findIndex((userGroup) => {
        return group._id === userGroup;
      });
      return index === -1;
    });

    this.setState({
      otherGroups,
      userGroups,
    })
  }

  addUserToGroup = (groupId) => () => {
    this.props.onAddGroupToUser(this.props.userInfo._id, groupId);
  }

  removeGroupFromUser = (groupId) => () => {
    this.props.onRemoveGroupFromUser(this.props.userInfo._id, groupId)
  }

  render() {
    const { userGroups, otherGroups } = this.state;
    return (
        <Grid.Column>
          <Grid columns='equal'>
            <Header as="h3">Groups</Header>
            <Grid.Row>
              <Segment className="edit-form">
                <List divided relaxed>
                  { userGroups.map((group) => (
                    <List.Item key={group._id}>
                      <List.Icon name='group' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header>
                          <Link to={`/groups/${group.name}`}>{ group.name }</Link>
                        </List.Header>
                        <List.Description>{ group.title }</List.Description>
                      </List.Content>
                      <List.Content floated='right'>
                        <Button negative onClick={this.removeGroupFromUser(group._id)}>Unfollow</Button>
                      </List.Content>  
                  </List.Item>
                  ))}
                </List> 
              </Segment>
            </Grid.Row>
            <Header as="h3">All Groups</Header>
            <Grid.Row>
              <Segment className="edit-form">
                <List divided relaxed>
                  { otherGroups.map((group) => (
                    <List.Item key={group._id}>
                    <List.Icon name='group' size='large' verticalAlign='middle' />
                    <List.Content>
                      <List.Header>
                        <Link to={`/groups/${group.name}`}>{ group.name }</Link>
                        </List.Header>
                      <List.Description>{ group.title }</List.Description>
                    </List.Content>
                    <List.Content floated='right'>
                      <Button positive onClick={this.addUserToGroup(group._id)}>Follow</Button>
                    </List.Content>
                  </List.Item>
                  ))}
                </List>
              </Segment>
            </Grid.Row>
          </Grid>
        </Grid.Column>
    );
  }
}

export default UserGroupsList;

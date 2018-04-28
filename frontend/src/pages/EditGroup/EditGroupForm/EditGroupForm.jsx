import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import GroupForm from './../../../components/GroupForm'; 
import GroupUsersList from './../GroupUsersList';
import './style.css';

class EditGroupForm extends Component {
  static propTypes = {
    groupInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      users: PropTypes.arrayOf(PropTypes.string),
    }),
    errors: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaulProps = {
    onSubmit: () => {},
    onChange: () => {},
    users: [],
  }

  constructor(props) {
    super(props);
    let tab = '';
    const location = this.props.location.pathname.split('/');
    if (location.length === 4 && location[3] === 'users') {
      tab = 'users';
    } else {
      tab = 'group';
    }
    this.state = { activeTab: tab };
  }

  componentWillReceiveProps(nextProps) {
    this.checkLocation(nextProps);
  }

  checkLocation = (props) => {
    let tab = '';
    const location = props.location.pathname.split('/');
    if (location.length === 4 && location[3] === 'users') {
      tab = 'users';
    } else {
      tab = 'group';
    }
    this.setState({ activeTab: tab });
  }

  handleFieldChange = (field) => (event) => {
    const { onChange } = this.props;
    onChange(field, event.target.value);
  }

  handleUsersChange = (event, data) => {
    this.props.onUsersChange(data.value);
  }

  handleTabChange = (e, { activeIndex }) => {
    if (activeIndex === 0 && this.state.activeTab !== 'group') {
      this.props.history.push(`/groups/${this.props.groupInfo.name}`);
    } else if (activeIndex === 1 && this.state.activeTab !== 'users') {
      this.props.history.push(`/groups/${this.props.groupInfo.name}/users`);
    }
  }

  render() {
    const { groupInfo, errors, users, onSubmit } = this.props;
    const panes = [
      { menuItem: 'Group', pane: (
        <Tab.Pane key=' group'>
          <GroupForm 
            groupInfo={groupInfo}
            errors={errors}
            handleSubmit={onSubmit}
            handleFieldChange={this.handleFieldChange}
            submitButtonText="Edit"
            className="edit-group"
          />
      </Tab.Pane>
      )}, 
      { menuItem: 'Users', pane: (
        <Tab.Pane key="users">
          <GroupUsersList
            groupInfo={groupInfo}
            users={users}
          />
        </Tab.Pane>
      ) },
    ];
    return (
      <div className="edit-tab-form">
        <Tab 
          panes={panes}
          renderActiveOnly={false}
          onTabChange={this.handleTabChange}
          activeIndex={this.state.activeTab === 'group' ? 0 : 1 }
        />
      </div>
    );
  }
};

export default withRouter(EditGroupForm);

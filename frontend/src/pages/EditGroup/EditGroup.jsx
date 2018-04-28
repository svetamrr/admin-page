import React, { Component } from 'react';
import Joi from 'joi';
import { Redirect } from 'react-router-dom';

import EditGroupForm from './EditGroupForm/EditGroupForm';
import NoGroup from './NoGroup/NoGroup';

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(20).regex(/[A-Za-z0-9]+$/).required(),
  title: Joi.string().min(6).max(20).required()
});

class EditGroup extends Component {
  state = {
    isGroup: false,
    groupInfo: {
      _id: '',
      name: '',
      title: '',
      users: [],
    },
    errors: {
      name: null,
      title: null,
    },
    users: [],
  };

  componentWillMount() {
    this.getGroupInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.group) {
      const { group, users } = nextProps;
      this.setState({ isGroup: true, groupInfo: group, users });
    } else {
      this.setState({ isGroup: false, groupInfo: null, users: [] });
    }
  }

  updateGroup = () => {
    const { _id, name, title } = this.state.groupInfo;
    const group = { _id, name, title };
    this.props.onUpdateGroup(group);
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    let errors = {
      name: null,
      title: null,
    };

    const { name, title } = this.state.groupInfo;
    const groupInfo = { name, title };

    const result = Joi.validate(groupInfo, schema);

    if (result.error) {
      result.error.details.map((error) => {
        const label = error.context.label;
        errors = {
          [label]: error.message,
        };
      });
    }

    this.setState({ errors });
    if (!result.error) {
      this.updateGroup();
    }
  };


  handleChange = (field, value) => {
    this.setState({
      groupInfo: {
        ...this.state.groupInfo,
        [field] : value,
      }
    })
  }

  getGroupInfo = () => {
    const { name } = this.props.match.params;
    this.props.onGetGroupByName(name);
  }

  render() {
    const { shouldRedirect } = this.props;
    const { isGroup, groupInfo, errors, users } = this.state;

    if (shouldRedirect) {
      return <Redirect to='/groups' />;
    }

    return (
      <div>
        { isGroup
          ? <EditGroupForm
              onSubmit={this.onSubmit} 
              onChange={this.handleChange}
              groupInfo={groupInfo}
              errors={errors}
              users={users}
            />
          : <NoGroup /> }
      </div>
    );
  }
};

export default EditGroup;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi';

import GroupForm from './../../components/GroupForm';
import './style.css';

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(20).regex(/[A-Za-z0-9]+$/).required(),
  title: Joi.string().min(6).max(20).required()
});

class AddGroup extends Component {
  state = {
    errors: {
      name: null,
      title: null,
    },
    groupInfo: {
      name: '',
      title: '',
    }
  }

  addGroup = () => {
    const { name, title } = this.state.groupInfo;
    const group = { name, title };
    this.props.onAddGroup(group);
  }

  handleSubmit = (event) => {
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
      this.addGroup();
    }
  }

  handleFieldChange = (field) => (event) => {
    this.setState({
      groupInfo: {
        ...this.state.groupInfo,
        [field]: event.target.value,
      }
    });
  };

  render() {
    const { groupInfo, errors } = this.state;
    const { shouldRedirect } = this.props.groups;

    if (shouldRedirect) {
      return <Redirect to='/groups' />;
    }

    return (
      <div>
        <GroupForm 
          groupInfo={groupInfo}
          errors={errors}
          handleSubmit={this.handleSubmit}
          handleFieldChange={this.handleFieldChange}
          submitButtonText="Add"
          className="add-group"
        />
      </div>
    );
  }
};

export default AddGroup;

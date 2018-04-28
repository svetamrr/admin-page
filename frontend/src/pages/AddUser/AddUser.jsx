import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi';

import UserForm from './../../components/UserForm';
import './style.css';

const schema = Joi.object().keys({
  username: Joi.string().min(4).max(20).regex(/[A-Za-z0-9]+$/).required(),
  firstName: Joi.string().min(2).max(20).regex(/[A-Za-z]/).required(),
  lastName: Joi.string().min(2).max(20).regex(/[A-Za-z]/).required(),
  email: Joi.string().min(3).max(30).regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required()
});

class AddUser extends Component {
  state = {
    errors: {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
    },
    userInfo: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    }
  }

  addUser = () => {
    const { username, firstName, lastName, email } = this.state.userInfo;
    const user = { username, firstName, lastName, email };
    this.props.onAddUser(user);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let errors = {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
    };

    const { username, firstName, lastName, email } = this.state.userInfo;
    const userInfo = { username, firstName, lastName, email };

    const result = Joi.validate(userInfo, schema);

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
      this.addUser();
    }
  }

  handleFieldChange = (field) => (event) => {
    this.setState({ 
      userInfo: {
        ...this.state.userInfo,
        [field]: event.target.value,
      }
    });
  };

  render() {
    const { shouldRedirect } = this.props.users;
    const { userInfo, errors } = this.state;

    if (shouldRedirect) {
      return <Redirect to='/users' />;
    }

    return (
      <div>
        <UserForm
          userInfo={userInfo}
          handleSubmit={this.handleSubmit}
          handleFieldChange={this.handleFieldChange}
          submitButtonText="Add"
          errors={errors}
          className="add-user"
        />
      </div>
    );
  }
};

export default AddUser;

import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types';

import UserForm from './../../../components/UserForm';
import './style.css';

class EditUserForm extends Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      username: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      groups: PropTypes.arrayOf(PropTypes.string),
    }),
    errors: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaulProps = {
    onSubmit: () => {},
    onChange: () => {},
    groups: [],
  }

  handleFieldChange = (field) => (event) => {
    const { onChange } = this.props;
    onChange(field, event.target.value);
  }
  
  render() {
    const { userInfo, errors } = this.props;
    return (
      <Grid.Column>
        <Header as="h3">Personal Info</Header>
        <UserForm 
          userInfo={userInfo}
          errors={errors}
          handleSubmit={this.props.onSubmit}
          handleFieldChange={this.handleFieldChange}
          submitButtonText="Edit"
          className="edit-user"
        />
      </Grid.Column>
    );
  }
};

export default EditUserForm;

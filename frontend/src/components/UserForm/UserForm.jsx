import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types';

import './style.css';

const UserForm = (props) => {
  const { userInfo, handleSubmit, handleFieldChange, errors, submitButtonText, className } = props;
  return(
    <Form onSubmit={handleSubmit} className={className}>
      <Form.Field>
        <label>Username</label>
        <input value={userInfo.username} name="username" onChange={handleFieldChange('username')} />
        { errors.username ? <span>{ errors.username }</span> : null }
      </Form.Field>
      <Form.Field>
        <label>First Name</label>
        <input value={userInfo.firstName} name="firstName" onChange={handleFieldChange('firstName')} />
        { errors.firstName ? <span>{ errors.firstName }</span> : null }
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input value={userInfo.lastName} name="lastName" onChange={handleFieldChange('lastName')} />
        { errors.lastName ? <span>{ errors.lastName }</span> : null }
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input value={userInfo.email} name="email" onChange={handleFieldChange('email')} />
        { errors.email ? <span>{ errors.email }</span> : null }
      </Form.Field>
      <Button type='submit' className="add">{submitButtonText}</Button>
    </Form>
  )
}

UserForm.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  errors: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  submitButtonText: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleFieldChange: PropTypes.func,
}

UserForm.defaultProps = {
  errors: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  submitButtonText: 'Submit',
  handleFieldChange: () => {},
  handleSubmit: () => {},
}

export default UserForm;

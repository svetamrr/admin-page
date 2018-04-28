import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './style.css';

const GroupForm = (props) => {
  const { groupInfo, errors, handleSubmit, handleFieldChange, submitButtonText, className } = props;
  return(
    <Form onSubmit={handleSubmit} className={className}>
      <Form.Field>
        <label>Name</label>
        <input value={groupInfo.name} name="name" onChange={handleFieldChange('name')} />
        { errors.name ? <span>{ errors.name }</span> : null }
      </Form.Field>
      <Form.Field>
        <label>Title</label>
        <input value={groupInfo.title} name="title" onChange={handleFieldChange('title')} />
        { errors.title ? <span>{ errors.title }</span> : null }
      </Form.Field>
      <Button type="submit" className="add">{submitButtonText}</Button>
    </Form>
  )
}

GroupForm.propTypes = {
  groupInfo: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
  }),
  errors: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  handleFieldChange: PropTypes.func,
  submitButtonText: PropTypes.string,
}

GroupForm.defaulProps = {
  errors: {
    name: '',
    title: '',
  },
  submitButtonText: 'Submit',
  handleFieldChange: () => {},
  handleSubmit: () => {},
}

export default GroupForm;

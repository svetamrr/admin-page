import React, { Component } from 'react';
import { Button, Form, Input, Message, Segment } from 'semantic-ui-react';
import Joi from 'joi';

import './style.css';

const schema = Joi.object().keys({
  email: Joi.string().min(3).max(30).regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
  password: Joi.string().min(8).max(30).required(),
});

class Login extends Component {
  state = {
    credentials: {
      email: '',
      password: '',
    },
    errors: {
      email: '',
      password: '',
    },
  }

  login = () => {
    this.props.onLogin(this.state.credentials);
  }

  handleInputChange = (field) => (event) => {
    const { value } = event.target;
    this.setState({
      credentials: {
        ...this.state.credentials,
        [field]: value,
      }
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { credentials } = this.state;
    let errors = { email: '', password: '' };
    const result = Joi.validate(credentials, schema);

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
      this.login();
    }
  }

  render() {
    const { credentials, errors } = this.state;
    return (
      <Segment className="login-form">
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Email</label>
            <Input
              value={credentials.email}
              icon="user"
              iconPosition="left"
              placeholder="Email"
              type="email"
              onChange={this.handleInputChange('email')}
            />
          </Form.Field>
          <Form.Field>
            { errors.email ? <Message content={errors.email} /> : null }
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              value={credentials.password}
              icon="unlock alternate"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={this.handleInputChange('password')}
            />
          </Form.Field>
          <Form.Field>
            { errors.password ? <Message content={errors.password} /> : null }
          </Form.Field>
          <Button type="submit">Log in</Button>
        </Form>
      </Segment>
    );
  }
}

export default Login;

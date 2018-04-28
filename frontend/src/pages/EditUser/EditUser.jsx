import React, { Component } from 'react';
import Joi from 'joi';
import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import NoUser from './NoUser';
import EditUserForm from './EditUserForm';
import UserGroupsList from './UserGroupsList';

const schema = Joi.object().keys({
  username: Joi.string().min(4).max(20).regex(/[A-Za-z0-9]+$/).required(),
  firstName: Joi.string().min(2).max(20).regex(/[A-Za-z]/).required(),
  lastName: Joi.string().min(2).max(20).regex(/[A-Za-z]/).required(),
  email: Joi.string().min(3).max(30).regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required()
});

class EditUser extends Component {
  state = {
    isUser: false,
    userInfo: {
      _id: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      groups: [],
    },
    errors: {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
    },
    groups: [],
  };

  componentWillMount() {
    this.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      const { user, groups } = nextProps;
      this.setState({  isUser: true, userInfo: user, groups });
    } else {
      this.setState({ isUser: false, userInfo: null, groups: [] });
    }
  }

  updateUser = () => {
    const { _id, username, firstName, lastName, email } = this.state.userInfo;
    const user = { _id, username, firstName, lastName, email };
    this.props.onUpdateUser(user);
  }

  onSubmit = (event) => {
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
      this.updateUser();
    }
  }

  handleChange = (field, value) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [field]: value,
      }
    })
  }
  
  getUserInfo = () => {
    const { username } = this.props.match.params;
    this.props.onGetUserByUserName(username)
  }

  render() {
    const { shouldRedirect } = this.props;
    const { isUser, errors, groups, userInfo } = this.state;

    if (shouldRedirect) {
      return <Redirect to='/users' />;
    }

    return (
      <div>
        { isUser
          ? <Grid divided="vertically">
              <Grid.Row columns={2}>
                <EditUserForm
                  onSubmit={this.onSubmit}
                  onChange={this.handleChange}
                  userInfo={userInfo}
                  errors={errors}
                  groups={groups}
                />
                <UserGroupsList 
                  userInfo={userInfo}
                  groups={groups}
                />
              </Grid.Row>
            </Grid>
          : <NoUser /> }
      </div>
    );
  }
};

export default EditUser;

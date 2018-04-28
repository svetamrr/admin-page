import React,  { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';

import Menu from './../../components/Menu';
import Login from './../Login';
import Groups from './../Groups';
import Users from './../Users';
import EditUser from './../EditUser';
import EditGroup from './../EditGroup';
import AddUser from './../AddUser';
import AddGroup from './../AddGroup';
import './style.css';

const token = localStorage.getItem('token');

const CommonRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !token ? (
        <Component {...props} />
      ) : (
        <Redirect to="/users" />
      )
    }
  />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class MainPage extends Component {
  logout = () => {
    this.props.onLogout();
  }

  render() {
    return (
        <div className="content">
          <Menu />
          <BrowserRouter >
            <Switch>
              <Route exact path="/" render={() => (<Redirect to="/users" />)} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute exact path="/users/addUser" component={AddUser} />
              <PrivateRoute path="/users/:username" component={EditUser} />
              <PrivateRoute exact path="/groups" component={Groups} />
              <PrivateRoute exact path="/groups/addGroup" component={AddGroup} />
              <PrivateRoute path="/groups/:name" component={EditGroup} />
              <PrivateRoute exact path="/groups/:name/users" component={EditGroup} />
              <CommonRoute path="/login" component={Login} />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default MainPage;

import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import './style.css';

class Menu extends Component {
  state = {
    pathname: '/users',
  };

  componentWillMount() {
    this.setCurrentRoute();
  }

  setCurrentRoute = () => {
    const { pathname } = window.location;
    if (this.state.pathname !== pathname) {
      this.setState({ pathname });
    }
  }

  goTo = (url) => {
    if (url !== this.state.pathname) {
      window.location.pathname = url;
    }
  }

  logout = () => {
    this.props.onLogout();
  }

  render() {
    const { pathname } = this.state;
    return (
      <div className="clearfix">
        <div className="menu">
          <Button 
            inverted
            color='blue'
            className={pathname === '/users' ? 'active' : ''}
            onClick={() => { this.goTo('/users')} }
          >Users
          </Button>
          <Button 
            inverted
            color='blue'
            className={pathname === '/groups' ? 'active' : ''}
            onClick={() => { this.goTo('/groups')} }
          >Groups
          </Button>
          <Button inverted color='blue' onClick={this.logout}>Log out</Button>
        </div>
      </div>
    );
  }
};

export default Menu;

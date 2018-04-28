import React, { Component } from 'react';

import Search from './../../components/Search';
import GroupsList from './GroupsList';

class Groups extends Component {
  componentWillMount() {
    this.props.onGetGroups();
  }
  render() {
    return (
      <div>
        {/* <Menu /> */}
        <Search type="groups" />
        <GroupsList groups={this.props.groups} />
      </div>
    );
  }
};

export default Groups;

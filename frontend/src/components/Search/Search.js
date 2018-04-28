import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './style.css';

class Search extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['users', 'groups']).isRequired,
  }

  handleSearchInputChange = (event) => {
    const { value } = event.target;
    const { type } = this.props;
    this.props.onSearch(value, type);
  }

  render() {
    return (
      <div className="clearfix">
        <Input 
          className="search"
          action={{ icon: 'search' }}
          placeholder='Search'
          onChange={this.handleSearchInputChange} />
      </div>
    );
  }
};

export default Search;

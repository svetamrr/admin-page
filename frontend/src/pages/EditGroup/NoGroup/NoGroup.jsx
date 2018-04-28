import React from 'react';
import { Message } from 'semantic-ui-react'

import './style.css';

const NoGroup = () => {
  return (
    <div>
      <Message>
        <Message.Header>
          This group does not exist
        </Message.Header>
        <p>
          Please, check your entries.
        </p>
      </Message>
    </div>
  )
}

export default NoGroup;

import UserGroupsList from './UserGroupsList';
import { connect } from 'react-redux';

import { addGroupToUser, removeGroupFromUser } from './../../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onAddGroupToUser: (userId, groupId) => {
      dispatch(addGroupToUser(userId, groupId));
    },
    onRemoveGroupFromUser: (userId, groupId) => {
      dispatch(removeGroupFromUser(userId, groupId));
    }
  }
}

export default connect(null, mapDispatchToProps)(UserGroupsList);

import GroupUsersList from './GroupUsersList';
import { connect } from 'react-redux';
import { addUserToGroup, removeUserFromGroup } from './../../../actions';


const mapStateToProps = (state) => ({
  shouldRedirect: state.groups.shouldRedirect,
  group: state.groups.group,
  users: state.users.list,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddUserToGroup: (groupId, userId) => {
      dispatch(addUserToGroup(groupId, userId));
    },
    onRemoveUserFromGroup: (groupId, userId) => {
      dispatch(removeUserFromGroup(groupId, userId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupUsersList);

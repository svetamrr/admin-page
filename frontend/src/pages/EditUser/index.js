import EditUser from './EditUser';
import { connect } from 'react-redux';
import { getUserByUserName, updateUser } from './../../actions';

const mapStateToProps = (state) => ({
  shouldRedirect: state.users.shouldRedirect,
  user: state.users.user,
  groups: state.groups.list,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUser: (user) => {
      dispatch(updateUser(user));
    },
    onGetUserByUserName: (username) => {
      dispatch(getUserByUserName(username));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);

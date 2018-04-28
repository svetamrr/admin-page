import UsersList from './UsersList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeUser } from './../../../actions';
import { toggleDeleteUserModal } from './../../../actions/appActions';

const mapStateToProps = (state) => ({ app: state.app });

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleDeleteUserModal: (flag) => {
      dispatch(toggleDeleteUserModal(flag));
    },
    onRemoveUser: (userId) => {
      dispatch(removeUser(userId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersList));

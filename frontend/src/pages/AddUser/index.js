import AddUser from './AddUser';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from './../../actions';

const mapStateToProps = (state) => ({ users: state.users });
const mapDispatchToProps = (dispatch) => {
  return {
    onAddUser: (user) => {
      dispatch(addUser(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddUser));

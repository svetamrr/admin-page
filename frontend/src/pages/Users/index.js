import Users from './Users';
import { connect } from 'react-redux';
import { getUsers } from './../../actions';

const mapStateToProps = (state) => ({ users: state.users.filteredList });

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: () => {
      dispatch(getUsers());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

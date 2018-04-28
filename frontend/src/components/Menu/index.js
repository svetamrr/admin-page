import Menu from './Menu';
import { connect } from 'react-redux';
import { logout } from './../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout());
    }
  }
}

export default connect(null, mapDispatchToProps)(Menu);

import { connect } from 'react-redux';
import { logout } from './../../actions';
import MainPage from './MainPage';

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout());
    }
  }
}

export default connect(null, mapDispatchToProps)(MainPage);

import Login from './Login';
import { connect } from 'react-redux';
import { login } from './../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (credentials) => {
      dispatch(login(credentials));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);

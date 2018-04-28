import EditUserForm from './EditUserForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export default connect()(withRouter(EditUserForm));

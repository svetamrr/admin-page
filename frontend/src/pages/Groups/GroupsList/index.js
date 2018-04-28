import GroupsList from './GroupsList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleDeleteUserModal } from './../../../actions/appActions';
import { removeGroup } from './../../../actions';

const mapStateToProps = (state) => ({ app: state.app })

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleDeleteUserModal: (flag) => {
      dispatch(toggleDeleteUserModal(flag));
    },
    onRemoveGroup: (groupId) => {
      dispatch(removeGroup(groupId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupsList));

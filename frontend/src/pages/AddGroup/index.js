import AddGroup from './AddGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addGroup } from './../../actions';

const mapStateToProps = (state) => ({ groups: state.groups });
const mapDispatchToProps = (dispatch) => {
  return {
    onAddGroup: (group) => {
      dispatch(addGroup(group))
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddGroup));

import EditGroup from './EditGroup';
import { connect } from 'react-redux';
import { getGroupByName, updateGroup } from './../../actions';

const mapStateToProps = (state) => ({ 
  shouldRedirect: state.groups.shouldRedirect,
  group: state.groups.group,
  users: state.users.list,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetGroupByName: (name) => {
      dispatch(getGroupByName(name));
    },
    onUpdateGroup: (group) => {
      dispatch(updateGroup(group));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);

import Groups from './Groups';
import { connect } from 'react-redux';
import { getGroups } from './../../actions';

const mapStateToProps = (state) => ({ groups: state.groups.filteredList });

const mapDispatchToProps = (dispatch) => {
  return {
    onGetGroups: () => {
      dispatch(getGroups());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);

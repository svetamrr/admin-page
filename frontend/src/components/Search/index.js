import Search from './Search';
import { connect } from 'react-redux';
import { search } from './../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (value, type) => {
      dispatch(search(value, type));
    }
  }
}

export default connect(null, mapDispatchToProps)(Search);

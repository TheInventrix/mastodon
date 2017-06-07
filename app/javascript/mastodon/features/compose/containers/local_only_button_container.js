import { connect } from 'react-redux';
import PrivacyDropdown from '../components/local_only_button';
import { changeComposeVisibility } from '../../../actions/compose';

const mapStateToProps = local => ({
  value: state.getIn(['compose', 'local']),
});

const mapDispatchToProps = dispatch => ({

  onChange (value) {
    dispatch(changeComposeLocality(value));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(LocalButton);

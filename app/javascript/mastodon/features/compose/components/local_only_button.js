import React from 'react';
import IconButton from '../../../components/icon_button';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import ImmutablePureComponent from 'react-immutable-pure-component';
import ImmutablePropTypes from 'react-immutable-proptypes';

const messages = defineMessages({
  local: { id: 'local.label', defaultMessage: 'Post to local instance' },
});

const iconStyle = {
  height: null,
  lineHeight: '27px',
};

class LocalButton extends ImmutablePureComponent {

  static propTypes = {
    local: PropTypes.bool.isRequired,
    intl: PropTypes.object.isRequired,
  };

  handleClick = () => {
    this.setState({ local: !this.local });;
  }

  setRef = (c) => {
    this.fileElement = c;
  }

  render () {

    const { local, intl } = this.props;

    return (
      <div ref={this.setRef} className={`local-only ${local ? 'active' : ''}`}>
      <div className='local-only_button'>
        <IconButton icon='users' title={intl.formatMessage(messages.local)} active={local} onClick={this.handleClick} className='local-only_button-icon' size={18} inverted style={iconStyle}/>
      </div>
      </div>
    );
  }

}

export default connect(makeMapStateToProps)(injectIntl(LocalButton));

import React from 'react';
import Link from 'react-router/lib/Link';
import { FormattedMessage } from 'react-intl';

class TabsBar extends React.Component {

  render () {
    return (
      <div className='tabs-bar'>
        <Link className='tabs-bar__link primary' activeClassName='active' to='/statuses/new'><i className='fa fa-fw fa-pencil' /><FormattedMessage id='tabs_bar.compose' defaultMessage='Compose' /></Link>
        <Link className='tabs-bar__link primary' activeClassName='active' to='/timelines/home'><i className='fa fa-fw fa-podcast' /><FormattedMessage id='tabs_bar.home' defaultMessage='Incoming Transmissions' /></Link>
        <Link className='tabs-bar__link primary' activeClassName='active' to='/notifications'><i className='fa fa-fw fa-wifi' /><FormattedMessage id='tabs_bar.notifications' defaultMessage='Hailing Frequency' /></Link>

        <Link className='tabs-bar__link secondary' activeClassName='active' to='/timelines/public/local'><i className='fa fa-fw fa-globe' /><FormattedMessage id='tabs_bar.local_timeline' defaultMessage='The Planet' /></Link>
        <Link className='tabs-bar__link secondary' activeClassName='active' to='/timelines/public'><i className='fa fa-fw fa-rocket' /><FormattedMessage id='tabs_bar.federated_timeline' defaultMessage='The Federation' /></Link>

        <Link className='tabs-bar__link primary' activeClassName='active' style={{ flexGrow: '0', flexBasis: '30px' }} to='/getting-started'><i className='fa fa-fw fa-home' /></Link>
      </div>
    );
  }

}

export default TabsBar;

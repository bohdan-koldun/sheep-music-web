import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames/bind';
import LocaleToggle from 'containers/LocaleToggle';
import { MdLibraryMusic, MdAlbum, MdGroup } from 'react-icons/md';
import Banner from './banner.png';
import messages from './messages';
import './Header.scss';

function Header({ location }) {
  const { pathname } = location || {};
  return (
    <div>
      <header>
        <div className="header-logo">
          <Link to="/">Sheep Music</Link>
        </div>
        <div className="header-links">
          <Link
            to="/songs"
            className={classNames({ 'active-link': pathname === '/songs' })}
          >
            <MdLibraryMusic />
            <FormattedMessage {...messages.songs} />
          </Link>
          <Link
            to="/albums"
            className={classNames({ 'active-link': pathname === '/albums' })}
          >
            <MdAlbum />
            <FormattedMessage {...messages.albums} />
          </Link>
          <Link
            to="/authors"
            className={classNames({ 'active-link': pathname === '/authors' })}
          >
            <MdGroup />
            <FormattedMessage {...messages.authors} />
          </Link>
        </div>
        <div className="header-locale">
          <LocaleToggle />
        </div>
      </header>
      <a href="https://sheep-music.com/">
        <img src={Banner} alt="sheep music" className="header-banner" />
      </a>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default withRouter(Header);

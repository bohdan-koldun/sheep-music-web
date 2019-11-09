/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames/bind';
import LocaleToggle from 'containers/LocaleToggle';
import {
  MdLibraryMusic,
  MdAlbum,
  MdGroup,
  MdMenu,
  MdSubject,
  MdClose,
  MdAccountBox,
} from 'react-icons/md';
import { useIntl } from 'containers/LanguageProvider';
import { FaYoutube } from 'react-icons/fa';
import commonMessages from 'translations/common-messages';
import Banner from './banner.png';
import Logo from '../../images/sheep music.svg';
import messages from './messages';
import './Header.scss';

function Header({ location, user }) {
  const { pathname } = location || {};
  const [showMenu, setShowMenu] = useState(false);

  const menuElem = useRef(null);
  const closeMenu = e => {
    if (menuElem.current.contains(e.target)) {
      return;
    }
    setShowMenu(false);
  };

  const intl = useIntl();

  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);
  return (
    <div>
      <header>
        <div className="header-top">
          <button
            type="button"
            className="header-bar"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <MdClose /> : <MdMenu />}{' '}
          </button>{' '}
          <div className="header-logo">
            <Link to="/">
              <img src={Logo} alt="Sheep Music" />
            </Link>{' '}
          </div>{' '}
          <div className="header-desktop-links header-links">
            <Link
              to="/songs"
              className={classNames({
                'active-link': pathname === '/songs',
              })}
            >
              <MdLibraryMusic />
              <FormattedMessage {...messages.songs} />{' '}
            </Link>{' '}
            <Link
              to="/topics"
              className={classNames('hide-small', {
                'active-link': pathname === '/topics',
              })}
            >
              <MdSubject />
              <FormattedMessage {...messages.topics} />{' '}
            </Link>{' '}
            <Link
              to="/albums"
              className={classNames({
                'active-link': pathname === '/albums',
              })}
            >
              <MdAlbum />
              <FormattedMessage {...messages.albums} />{' '}
            </Link>{' '}
            <Link
              to="/authors"
              className={classNames('hide-medium', {
                'active-link': pathname === '/authors',
              })}
            >
              <MdGroup />
              <FormattedMessage {...messages.authors} />{' '}
            </Link>{' '}
          </div>{' '}
          <Link to="/login" className="header-login">
            {' '}
            <MdAccountBox />
            <span>
              {user ? user.name : intl.formatMessage(commonMessages.login)}
            </span>
          </Link>
          <div className="header-locale">
            <LocaleToggle />
          </div>{' '}
        </div>
        <div
          className={classNames('menu header-links', {
            'show-menu': showMenu,
          })}
          ref={menuElem}
        >
          <Link
            to="/songs"
            className={classNames({
              'active-link': pathname === '/songs',
            })}
            onClick={() => setShowMenu(false)}
          >
            <MdLibraryMusic />
            <FormattedMessage {...messages.songs} />{' '}
          </Link>{' '}
          <Link
            to="/topics"
            className={classNames({
              'active-link': pathname === '/topics',
            })}
            onClick={() => setShowMenu(false)}
          >
            <MdSubject />
            <FormattedMessage {...messages.topics} />{' '}
          </Link>{' '}
          <Link
            to="/albums"
            className={classNames({
              'active-link': pathname === '/albums',
            })}
            onClick={() => setShowMenu(false)}
          >
            <MdAlbum />
            <FormattedMessage {...messages.albums} />{' '}
          </Link>{' '}
          <Link
            to="/authors"
            className={classNames({
              'active-link': pathname === '/authors',
            })}
            onClick={() => setShowMenu(false)}
          >
            <MdGroup />
            <FormattedMessage {...messages.authors} />{' '}
          </Link>{' '}
          <Link
            to="/videos"
            className={classNames({
              'active-link': pathname === '/videos',
            })}
            onClick={() => setShowMenu(false)}
          >
            <FaYoutube />
            <FormattedMessage {...messages.videos} />{' '}
          </Link>{' '}
        </div>{' '}
      </header>
      <a href="https://sheep-music.com/">
        <img src={Banner} alt="sheep music" className="header-banner" />
      </a>{' '}
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  user: PropTypes.object,
};

export default withRouter(Header);

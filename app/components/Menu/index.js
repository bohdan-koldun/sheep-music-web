/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames/bind';
import LocaleToggle from 'containers/LocaleToggle';
import { IoIosMusicalNotes, IoIosBookmarks } from 'react-icons/io';
import {
  FiPlay,
  FiMic,
  FiGrid,
  FiFileText,
  FiChevronRight,
} from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { MdClose, MdMenu, MdMoreVert } from 'react-icons/md';
import { useIntl } from 'containers/LanguageProvider';
import commonMessages from 'translations/common-messages';
import Logo from '../../images/sheep music.svg';
import messages from './messages';
import './Menu.scss';
import AsideLoginLogo from './aside-login-logo.png';

function Menu({ location, user }) {
  const { pathname } = location || {};
  const intl = useIntl();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const menuElem = useRef(null);
  const closeMenu = e => {
    if (menuElem.current.contains(e.target)) {
      return;
    }
    setShowMobileMenu(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  const MenuLink = ({ linkPath, children, subPageRoot }) => {
    const isActive =
      pathname === linkPath ||
      (subPageRoot && new RegExp(subPageRoot).test(pathname));

    return (
      <Link
        to={linkPath}
        className={classNames({
          'active-menu-link': isActive,
        })}
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <div>{children}</div>
        {isActive && <FiChevronRight className="arrow-icon" />}
      </Link>
    );
  };

  MenuLink.propTypes = {
    linkPath: PropTypes.string,
    children: PropTypes.array,
    subPageRoot: PropTypes.string,
  };

  return (
    <React.Fragment>
      <header className="header-mobile-menu">
        <button
          type="button"
          className="mobile-menu-bar"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <MdClose /> : <MdMenu />}{' '}
        </button>{' '}
        <div className="mobile-menu-logo">
          <img src={Logo} alt="Sheep Music" />
        </div>{' '}
        <button type="button" className="mobile-more-bar">
          <MdMoreVert />
        </button>{' '}
      </header>
      <aside
        className={classNames('aside-menu', {
          'show-menu-on-mobile': showMobileMenu,
        })}
        ref={menuElem}
      >
        <div className="aside-menu-content-wraper">
          <div className="aside-menu-content">
            <div className="aside-menu-logo">
              <Link to="/">
                <img src={Logo} alt="Sheep Music" />
              </Link>{' '}
            </div>{' '}
            <div className="aside-menu-links">
              <MenuLink linkPath="/topics">
                <FiGrid />
                <FormattedMessage {...messages.topics} />{' '}
              </MenuLink>
              <MenuLink linkPath="/songs" subPageRoot="/song/">
                <FiFileText />
                <FormattedMessage {...messages.songs} />{' '}
              </MenuLink>
              <MenuLink linkPath="/authors" subPageRoot="/author/">
                <FiMic />
                <FormattedMessage {...messages.authors} />{' '}
              </MenuLink>
              <MenuLink linkPath="/albums" subPageRoot="/album/">
                <IoIosMusicalNotes />
                <FormattedMessage {...messages.albums} />{' '}
              </MenuLink>
              <MenuLink linkPath="/videos" subPageRoot="/video/">
                <FiPlay />
                <FormattedMessage {...messages.videos} />{' '}
              </MenuLink>
            </div>{' '}
            <hr />
            <div className="aside-menu-links">
              <MenuLink linkPath="/favorites">
                <FaStar className="yellow-icon" />
                <FormattedMessage {...messages.favorites} />{' '}
              </MenuLink>
              <MenuLink linkPath="/notebook">
                <IoIosBookmarks className="yellow-icon" />
                <FormattedMessage {...messages.notebook} />{' '}
              </MenuLink>
            </div>
            <hr />
            <Link
              to="/login"
              className="aside-menu-login"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <img src={AsideLoginLogo} alt="Sheep Music Login" />
              <button type="button">
                {user ? user.name : intl.formatMessage(commonMessages.login)}
              </button>
            </Link>
            <hr />
            <div className="aside-menu-locale">
              <LocaleToggle />
            </div>{' '}
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}

Menu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  user: PropTypes.object,
};

export default withRouter(Menu);

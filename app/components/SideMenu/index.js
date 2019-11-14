/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames/bind';
import LocaleToggle from 'containers/LocaleToggle';
import { IoIosMusicalNotes } from 'react-icons/io';
import {
  FiPlay,
  FiMic,
  FiGrid,
  FiFileText,
  FiChevronRight,
} from 'react-icons/fi';
import { useIntl } from 'containers/LanguageProvider';
import commonMessages from 'translations/common-messages';
import Logo from '../../images/sheep music.svg';
import messages from './messages';
import './SideMenu.scss';
import AsideLoginLogo from './aside-login-logo.png';

function SideMenu({ location, user }) {
  const { pathname } = location || {};
  const intl = useIntl();

  // const [showMenu, setShowMenu] = useState(false);

  // const menuElem = useRef(null);
  // const closeMenu = e => {
  //   if (menuElem.current.contains(e.target)) {
  //     return;
  //   }
  //   setShowMenu(false);
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', closeMenu);
  //   return () => {
  //     document.removeEventListener('mousedown', closeMenu);
  //   };
  // }, []);

  const MenuLink = ({ linkPath, children }) => (
    <Link
      to={linkPath}
      className={classNames({
        'active-menu-link': pathname === linkPath,
      })}
    >
      <div>{children}</div>
      {pathname === linkPath && <FiChevronRight className="arrow-icon" />}
    </Link>
  );

  MenuLink.propTypes = {
    linkPath: PropTypes.string,
    children: PropTypes.array,
  };

  return (
    <aside className="aside-menu">
      <div className="aside-menu-content">
        {/* <button
            type="button"
            className="mobile-menu-bar"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <MdClose /> : <MdMenu />}{' '}
          </button>{' '} */}
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
          <MenuLink linkPath="/songs">
            <FiFileText />
            <FormattedMessage {...messages.songs} />{' '}
          </MenuLink>
          <MenuLink linkPath="/authors">
            <FiMic />
            <FormattedMessage {...messages.authors} />{' '}
          </MenuLink>
          <MenuLink linkPath="/albums">
            <IoIosMusicalNotes />
            <FormattedMessage {...messages.albums} />{' '}
          </MenuLink>
          <MenuLink linkPath="/videos">
            <FiPlay />
            <FormattedMessage {...messages.videos} />{' '}
          </MenuLink>
        </div>{' '}
        <hr />
        <Link to="/login" className="aside-menu-login">
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
    </aside>
  );
}

SideMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  user: PropTypes.object,
};

export default withRouter(SideMenu);

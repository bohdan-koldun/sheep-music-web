import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { MdLibraryMusic, MdAlbum, MdGroup } from 'react-icons/md';
import { FaYoutube, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { FiFacebook, FiYoutube } from 'react-icons/fi';
import menuMessages from 'components/Menu/messages';
import messages from './messages';
import Logo from './logo.png';
import './Footer.scss';

function Footer({ location }) {
  const { pathname } = location || {};
  return (
    <footer>
      <section className="footer-website-menu">
        <div>
          <img src={Logo} className="footer-logo" alt="logo sheep music" />
        </div>
        <div>
          <h3>
            <FormattedMessage {...messages.menuMessage} />
          </h3>
          <div className="footer-links">
            <Link
              to="/songs"
              className={classNames({ 'active-link': pathname === '/songs' })}
            >
              <MdLibraryMusic />
              <FormattedMessage {...menuMessages.songs} />
            </Link>
            <Link
              to="/albums"
              className={classNames({ 'active-link': pathname === '/albums' })}
            >
              <MdAlbum />
              <FormattedMessage {...menuMessages.albums} />
            </Link>
            <Link
              to="/authors"
              className={classNames({ 'active-link': pathname === '/authors' })}
            >
              <MdGroup />
              <FormattedMessage {...menuMessages.authors} />
            </Link>
            <Link
              to="/videos"
              className={classNames({ 'active-link': pathname === '/videos' })}
            >
              <FaYoutube />
              <FormattedMessage {...menuMessages.videos} />
            </Link>
          </div>
        </div>
        <div className="footer-social">
          <FiFacebook className="social-icon" />
          <FaInstagram className="social-icon" />
          <FaTelegramPlane className="social-icon" />
          <FiYoutube className="social-icon" />
        </div>
      </section>
      <section className="footer-website-rule">
        <p className="copyright">
          <FormattedMessage {...messages.licenseMessage} />
        </p>
        <p>
          <FormattedMessage {...messages.footerMessage} />
        </p>
      </section>
    </footer>
  );
}

Footer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default withRouter(Footer);

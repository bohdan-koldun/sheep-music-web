import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { MdLibraryMusic, MdAlbum, MdGroup } from 'react-icons/md';
import { FaYoutube, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { FiFacebook, FiYoutube, FiGrid, FiBookmark } from 'react-icons/fi';
import menuMessages from 'components/Menu/messages';
import './Footer.scss';

function Footer({ location }) {
  const { pathname } = location || {};
  return (
    <footer>
      <div className="footer-website-menu">
        <div className="footer-links">
          <Link
            to="/topics"
            className={classNames({ 'active-link': pathname === '/topics' })}
          >
            <FiGrid />
            <FormattedMessage {...menuMessages.topics} />
          </Link>
          <Link
            to="/favorites"
            className={classNames({ 'active-link': pathname === '/favorites' })}
          >
            <FiBookmark />
            <FormattedMessage {...menuMessages.favorites} />
          </Link>
        </div>
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
        <div className="footer-social">
          <div>
            <FiFacebook className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaTelegramPlane className="social-icon" />
            <FiYoutube className="social-icon" />
          </div>
          <div className="email">
            <a href="mailto:sheep.music.com@gmail.com">
              sheep.music.com@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        {`© ${new Date().getFullYear()} sheep-music.com`}
      </div>
    </footer>
  );
}

Footer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default withRouter(Footer);

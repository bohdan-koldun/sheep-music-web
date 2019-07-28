import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LocaleToggle from 'containers/LocaleToggle';
import Banner from './banner.png';
import messages from './messages';
import './Header.scss';

function Header() {
  return (
    <div>
      <header>
        <div className="header-logo">
          <Link to="/">Sheep Music</Link>
        </div>
        <div className="header-links">
          <Link to="/songs">
            <FormattedMessage {...messages.songs} />
          </Link>
          <Link to="/albums">
            <FormattedMessage {...messages.albums} />
          </Link>
          <Link to="/authors">
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

export default Header;

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import Banner from './banner.jpg';
import messages from './messages';
import './Header.scss';

function Header() {
  return (
    <div>
      <a href="https://sheep-music.com/">
        <img src={Banner} alt="sheep music" className="header-banner" />
      </a>
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
    </div>
  );
}

export default Header;

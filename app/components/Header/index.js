import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

function Header() {
  return (
    <div>
      <A href="https://sheep-music.com/">
        <Img src={Banner} alt="sheep music" />
      </A>
      <NavBar>
        <HeaderLink to="/songs">
          <FormattedMessage {...messages.songs} />
        </HeaderLink>
        <HeaderLink to="/albums">
          <FormattedMessage {...messages.albums} />
        </HeaderLink>
        <HeaderLink to="/authors">
          <FormattedMessage {...messages.authors} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;

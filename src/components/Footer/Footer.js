import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© Sheep Music</span>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/">
            Главная
          </Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/privacy">
            Конфиденциальность
          </Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/not-found">
            404
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    obj: PropTypes.JSON,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Sheep Music</h1>
          {JSON.stringify(this.props.obj)}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);

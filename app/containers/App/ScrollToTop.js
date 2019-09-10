import { useEffect } from 'react';
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);

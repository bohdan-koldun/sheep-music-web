import { useEffect } from 'react';
import { withRouter } from 'react-router';

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log('----', pathname, divHeight, divHeight.offsetHeight)
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);

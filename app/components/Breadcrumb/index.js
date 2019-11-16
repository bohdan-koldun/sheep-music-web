import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'containers/LanguageProvider';
import classNames from 'classnames/bind';
import menuMessages from 'components/SideMenu/messages';
import PropTypes from 'prop-types';
import { FiChevronsRight } from 'react-icons/fi';
import './Breadcrumb.scss';

function Breadcrumb({ pageList }) {
  const intl = useIntl();
  const lastLink = pageList ? pageList.length - 1 : 0;

  return (
    <div className="breadcrumb">
      <Link to="/">{intl.formatMessage(menuMessages.home)}</Link>
      {pageList &&
        pageList.map((page, i) => (
          <React.Fragment key={page.link}>
            <FiChevronsRight className="breadcrumb-arrow" />
            <Link
              to={page.link}
              className={classNames({ 'last-breadcrumb-link': i === lastLink })}
            >
              {page.name}
            </Link>
          </React.Fragment>
        ))}
    </div>
  );
}

Breadcrumb.propTypes = {
  pageList: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

export default Breadcrumb;

import React from 'react';
import PropTypes from 'prop-types';
import {
  MdRemoveRedEye,
  MdFavorite,
  MdTrendingUp,
  MdAndroid,
} from 'react-icons/md';

function TableModeratorStatistic({ data, title }) {
  return (
    <div className="moderator-statistic-table">
      {title && <h3>{title}</h3>}
      {data && (
        <React.Fragment>
          <div className="moderator-statistic-row moderator-statistic-row">
            <div>
              <span>Модератор</span>
              <MdAndroid />
            </div>
            <div>
              <span>Кількість</span>
              <MdTrendingUp />
            </div>
            <div>
              <span>Перегляди </span>
              <MdRemoveRedEye />
            </div>
            <div>
              <span>Лайки</span>
              <MdFavorite />
            </div>
          </div>
          {data.map(row => (
            <div className="moderator-statistic-row" key={row.id}>
              <div className="user-name">{row.name}</div>
              <div>{row.count}</div>
              <div>{row.sumview || 0}</div>
              <div>{row.sumlike || 0}</div>
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}

TableModeratorStatistic.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default TableModeratorStatistic;

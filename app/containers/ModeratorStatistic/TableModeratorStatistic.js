/* eslint-disable eqeqeq */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MdRemoveRedEye,
  MdFavorite,
  MdTrendingUp,
  MdAndroid,
} from 'react-icons/md';
import { GiTrophyCup } from 'react-icons/gi';

function TableModeratorStatistic({ data, title }) {
  const maxCount = Math.max(...data.map(row => parseInt(row.count, 10))) || -1;
  const maxView = Math.max(...data.map(row => parseInt(row.sumview, 10))) || -1;
  const maxLike = Math.max(...data.map(row => parseInt(row.sumlike, 10))) || -1;

  return (
    <div className="moderator-statistic-table">
      {title && <h3>{title}</h3>}
      {data && (
        <React.Fragment>
          <div className="moderator-statistic-row moderator-statistic-header">
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
          {data.map(({ count = 0, sumview = 0, sumlike = 0, id, name }) => (
            <div className="moderator-statistic-row" key={id}>
              <div className="user-name">{name}</div>
              <div>
                {count == maxCount ? (
                  <React.Fragment>
                    <span>{count}</span>
                    <GiTrophyCup />
                  </React.Fragment>
                ) : (
                  count
                )}
              </div>
              <div>
                {sumview == maxView ? (
                  <React.Fragment>
                    <span>{sumview}</span>
                    <GiTrophyCup />
                  </React.Fragment>
                ) : (
                  sumview
                )}
              </div>
              <div>
                {sumlike == maxLike ? (
                  <React.Fragment>
                    <span>{sumlike}</span>
                    <GiTrophyCup />
                  </React.Fragment>
                ) : (
                  sumlike
                )}
              </div>
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

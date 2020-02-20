import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Loader from 'components/Loader';
import Breadcrumb from 'components/Breadcrumb';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectModeratorStatistic,
} from './selectors';
import { loadModeratorStatistic } from './actions';
import reducer from './reducer';
import saga from './saga';
import TableModeratorStatistic from './TableModeratorStatistic';
import './ModeratorStatistic.scss';

export function ModeratorStatistic({
  onLoadStatistic,
  loading,
  error,
  statistic,
}) {
  useInjectReducer({ key: 'moderatorStatistic', reducer });
  useInjectSaga({ key: 'moderatorStatistic', saga });

  useEffect(() => {
    onLoadStatistic();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <React.Fragment>
      {statistic && (
        <React.Fragment>
          <Breadcrumb
            pageList={[
              {
                link: '/moderator/statistic',
                name: 'Статистика',
              },
            ]}
          />
          <h2>Статистика добавлених пісень:</h2>
          <div className="statistic-tables">
            {statistic.songs && (
              <TableModeratorStatistic data={statistic.songs} title="Пісні" />
            )}
            {statistic.albums && (
              <TableModeratorStatistic
                data={statistic.albums}
                title="Альбоми"
              />
            )}
            {statistic.authors && (
              <TableModeratorStatistic
                data={statistic.authors}
                title="Виконавці"
              />
            )}
          </div>
          <h2>Статистика відредагованих пісень:</h2>
          <div className="statistic-tables">
            {statistic.editedSongs && (
              <TableModeratorStatistic
                data={statistic.editedSongs}
                title="Пісні"
              />
            )}
            {statistic.editedAlbums && (
              <TableModeratorStatistic
                data={statistic.editedAlbums}
                title="Альбоми"
              />
            )}
            {statistic.editedAuthors && (
              <TableModeratorStatistic
                data={statistic.editedAuthors}
                title="Виконавці"
              />
            )}
          </div>
        </React.Fragment>
      )}
      {error && <div>Ошибка! Не могу загрузить дание.</div>}
    </React.Fragment>
  );
}

ModeratorStatistic.propTypes = {
  onLoadStatistic: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  statistic: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  statistic: makeSelectModeratorStatistic(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadStatistic: () => dispatch(loadModeratorStatistic()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ModeratorStatistic);

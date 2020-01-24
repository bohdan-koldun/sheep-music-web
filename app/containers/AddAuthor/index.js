/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import checkUserPermissions from 'utils/checkPermissions';
import {
  makeSelectUser,
  makeSelectGlobalLoading,
} from 'containers/App/selectors';
import { AuthorForm } from 'containers/Form';
import Loader from 'components/Loader';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorData,
  makeSelectResultAdding,
} from './selectors';
import { addAuthor, updateAuthorStore, clearAuthorStore } from './actions';
import reducer from './reducer';
import saga from './saga';
import './AddAuthor.scss';

export function AddAuthor({
  author,
  result,
  user,
  error,
  loading,
  globalLoading,
  onAddAuthor,
  onUpdateAuthorStore,
  onClearAuthorStore,
}) {
  useInjectReducer({ key: 'addAuthor', reducer });
  useInjectSaga({ key: 'addAuthor', saga });

  const isAdminOrModerator = checkUserPermissions(user, ['admin', 'moderator']);

  return (
    <React.Fragment>
      <h1>Добавить исполнителя:</h1>
      {isAdminOrModerator ? (
        <div className="add-author-page">
          {loading || globalLoading ? (
            <Loader />
          ) : (
            (result && (
              <div>
                <h2>
                  Песня добавлена:{' '}
                  <Link to={`/author/${result.slug}`}>{result.title}</Link>
                </h2>
                <button type="button" onClick={onClearAuthorStore}>
                  Добавить еще
                </button>
              </div>
            )) || (
              <AuthorForm
                author={author}
                outsideError={error}
                onSubmit={onAddAuthor}
                onWillUnmount={onUpdateAuthorStore}
              />
            )
          )}
        </div>
      ) : (
        <p className="error-label">У вас нет прав!</p>
      )}
    </React.Fragment>
  );
}

AddAuthor.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  globalLoading: PropTypes.bool,
  author: PropTypes.object,
  result: PropTypes.object,
  onAddAuthor: PropTypes.func,
  onUpdateAuthorStore: PropTypes.func,
  onClearAuthorStore: PropTypes.func,
  user: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  globalLoading: makeSelectGlobalLoading(),
  error: makeSelectError(),
  author: makeSelectAuthorData(),
  result: makeSelectResultAdding(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddAuthor: author => dispatch(addAuthor(author)),
    onClearAuthorStore: () => dispatch(clearAuthorStore()),
    onUpdateAuthorStore: author => dispatch(updateAuthorStore(author)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddAuthor);

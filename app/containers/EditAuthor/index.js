/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isAdminOrModerator } from 'utils/checkPermissions';
import Loader from 'components/Loader';
import { AuthorForm } from 'containers/Form';
import { makeSelectUser } from 'containers/App/selectors';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthorData,
} from './selectors';
import { loadAuthor, editAuthor } from './actions';
import reducer from './reducer';
import saga from './saga';
import './EditAuthor.scss';

export function EditAuthor({
  onLoadAuthor,
  author,
  user,
  error,
  match,
  loading,
  onEditAuthor,
}) {
  useInjectReducer({ key: 'editAuthor', reducer });
  useInjectSaga({ key: 'editAuthor', saga });

  useEffect(() => {
    onLoadAuthor(match.params.slug);
  }, []);

  return (
    <React.Fragment>
      <h1>Редактирование исполнителя:</h1>
      <div className="edit-author-page">
        {loading ? (
          <Loader />
        ) : (
          isAdminOrModerator(user) && (
            <AuthorForm
              author={author}
              onSubmit={data => onEditAuthor({ ...data, id: author.id })}
              outsideError={error}
            />
          ) || <p className="error-label">У вас нет прав!</p>
        )}
      </div>
    </React.Fragment>
  );
}

EditAuthor.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  author: PropTypes.object,
  onLoadAuthor: PropTypes.func,
  onEditAuthor: PropTypes.func,
  user: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  author: makeSelectAuthorData(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadAuthor: slug => dispatch(loadAuthor(slug)),
    onEditAuthor: author => dispatch(editAuthor(author)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditAuthor);

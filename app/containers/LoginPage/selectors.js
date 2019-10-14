import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.error,
  );

const makeSelectUser = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.user,
  );

export {
  selectLoginPageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectUser,
};

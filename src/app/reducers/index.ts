import {createSelector} from 'reselect';
// @ngrx
import {ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
// environment
import {environment} from '../../environments/environment';
import {RouterStateUrl} from '../shared/utils';
/**
 * Every reducer module"s default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as users from '../users/reducers/users.reducers';
import {storeFreeze} from 'ngrx-store-freeze';

/**
 * We treat each reducer like a table in a database.
 * This means our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>,
  users: users.State
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  users: users.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];


/**********************************************************
 * Users Reducers
 *********************************************************/

/**
 * Returns the user state.
 * @function getUserState
 * @param {State} state Top level state.
 * @return {State}
 */
export const getUsersState = createFeatureSelector<users.State>('users'); /*(state: State) => state.users;*/

/**
 * Returns the authenticated user
 * @function getAuthenticatedUser
 * @param {State} state
 * @param {any} props
 * @return {User}
 */
export const getAuthenticatedUser = createSelector(getUsersState, users.getAuthenticatedUser);

/**
 * Returns the authentication error.
 * @function getAuthenticationError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getAuthenticationError = createSelector(getUsersState, users.getAuthenticationError);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticated = createSelector(getUsersState, users.isAuthenticated);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticatedLoaded = createSelector(getUsersState, users.isAuthenticatedLoaded);

/**
 * Returns true if the authentication request is loading.
 * @function isAuthenticationLoading
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticationLoading = createSelector(getUsersState, users.isLoading);

/**
 * Returns the sign out error.
 * @function getSignOutError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getSignOutError = createSelector(getUsersState, users.getSignOutError);

/**
 * Returns the sign up error.
 * @function getSignUpError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getSignUpError = createSelector(getUsersState, users.getSignUpError);

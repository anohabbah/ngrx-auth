// import type function
import {User} from '../core/models/user';
import {Action} from '@ngrx/store';

// import models

export enum ActionTypes {
  AUTHENTICATE = '[users] Authenticate',
  AUTHENTICATE_ERROR = '[users] Authentication error',
  AUTHENTICATE_SUCCESS = '[users] Authentication success',
  AUTHENTICATED = '[users] Authenticated',
  AUTHENTICATED_ERROR = '[users] Authenticated error',
  AUTHENTICATED_SUCCESS = '[users] Authenticated success',
  SIGN_OUT = '[users] Sign off',
  SIGN_OUT_ERROR = '[users] Sign off error',
  SIGN_OUT_SUCCESS = '[users] Sign off success',
  SIGN_UP = '[users] Sign up',
  SIGN_UP_ERROR = '[users] Sign up error',
  SIGN_UP_SUCCESS = '[users] Sign up success',
  LOGIN_REDIRECT = '[USERS] Login Redirect'
}

/**
 * Authenticate.
 * @class AuthenticateAction
 * @implements {Action}
 */
export class Authenticate implements Action {
  public readonly type: string = ActionTypes.AUTHENTICATE;

  constructor(public payload: { email: string, password: string }) {
  }
}

/**
 * Checks if user is authenticated.
 * @class AuthenticatedAction
 * @implements {Action}
 */
export class Authenticated implements Action {
  public readonly type: string = ActionTypes.AUTHENTICATED;

  constructor(public payload?: { token?: string }) {
  }
}

/**
 * Authenticated check success.
 * @class AuthenticatedSuccessAction
 * @implements {Action}
 */
export class AuthenticatedSuccess implements Action {
  public readonly type: string = ActionTypes.AUTHENTICATED_SUCCESS;

  constructor(public payload: { authenticated: boolean, user: User }) {
  }
}

/**
 * Authentication error.
 * @class AuthenticationErrorAction
 * @implements {Action}
 */
export class AuthenticationError implements Action {
  public readonly type: string = ActionTypes.AUTHENTICATE_ERROR;

  constructor(public payload?: any) {
  }
}

/**
 * Authenticated check error.
 * @class AuthenticatedErrorAction
 * @implements {Action}
 */
export class AuthenticatedError implements Action {
  public readonly type: string = ActionTypes.AUTHENTICATED_ERROR;

  constructor(public payload?: any) {
  }
}

/**
 * Authentication success.
 * @class AuthenticationSuccessAction
 * @implements {Action}
 */
export class AuthenticationSuccess implements Action {
  public readonly type: string = ActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: { user: User }) {
  }
}

/**
 * Sign out.
 * @class SignOutAction
 * @implements {Action}
 */
export class SignOut implements Action {
  public readonly type: string = ActionTypes.SIGN_OUT;

  constructor(public payload?: any) {
  }
}

/**
 * Sign out error.
 * @class SignOutErrorAction
 * @implements {Action}
 */
export class SignOutError implements Action {
  public readonly type: string = ActionTypes.SIGN_OUT_SUCCESS;

  constructor(public payload?: any) {
  }
}

/**
 * Sign out success.
 * @class SignOutSuccessAction
 * @implements {Action}
 */
export class SignOutSuccess implements Action {
  public readonly type: string = ActionTypes.SIGN_OUT_SUCCESS;

  constructor(public payload?: any) {
  }
}

/**
 * Sign up.
 * @class SignUpAction
 * @implements {Action}
 */
export class SignUp implements Action {
  public readonly type: string = ActionTypes.SIGN_UP;

  constructor(public payload: { user: User }) {
  }
}

/**
 * Sign up error.
 * @class SignUpErrorAction
 * @implements {Action}
 */
export class SignUpError implements Action {
  public readonly type: string = ActionTypes.SIGN_UP_ERROR;

  constructor(public payload?: any) {
  }
}

/**
 * Sign up success.
 * @class SignUpSuccessAction
 * @implements {Action}
 */
export class SignUpSuccess implements Action {
  public readonly type: string = ActionTypes.SIGN_UP_SUCCESS;

  constructor(public payload: { user: User }) {
  }
}

export class LoginRedirect implements Action {
  public readonly type: ActionTypes.LOGIN_REDIRECT;
}

/**
 * Actions type.
 * @type {Actions}
 */
export type Actions =
  Authenticate
  | Authenticated
  | AuthenticatedError
  | AuthenticatedSuccess
  | AuthenticationError
  | AuthenticationSuccess
  | SignUp
  | SignUpError
  | SignUpSuccess;

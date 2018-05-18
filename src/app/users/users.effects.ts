import {Injectable} from '@angular/core';
// import @ngrx
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
// import rxjs
import {Observable} from 'rxjs/Observable';
// import services
import {AuthenticatorService} from '../core/services/authenticator.service';
// import models
import {User} from '../core/models/user';
// import actions
import {
  ActionTypes,
  AuthenticatedErrorAction,
  AuthenticatedSuccessAction, AuthenticationErrorAction,
  AuthenticationSuccessAction,
  SignOutErrorAction,
  SignOutSuccessAction,
  SignUpErrorAction,
  SignUpSuccessAction
} from './users.actions';
import {catchError, debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `action => action.payload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `action => action.payload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class UserEffects {

  /**
   * Authenticate user.
   */
  @Effect()
  public authenticate = this.actions.pipe(
    ofType(ActionTypes.AUTHENTICATE),
    debounceTime(500),
    map(action => action.payload),
    switchMap(payload => {
      return this.authenticator.authenticate(payload.email, payload.password).pipe(
        map(user => new AuthenticationSuccessAction({user: User})),
        catchError(error => Observable.of(new AuthenticationErrorAction({error: error})))
      );
    })
  );

  /**
   * Determine if the user is authenticated.
   */
  @Effect()
  public authenticated: Observable<Action> = this.actions
    .ofType(ActionTypes.AUTHENTICATED)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.authenticator.authenticatedUser()
        .map(user => new AuthenticatedSuccessAction({authenticated: (user !== null), user: User}))
        .catch(error => Observable.of(new AuthenticatedErrorAction({error: error})));
    });

  /**
   * Create a new user.
   */
  @Effect()
  public createUser: Observable<Action> = this.actions
    .ofType(ActionTypes.SIGN_UP)
    .debounceTime(500)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.authenticator.create(payload.user)
        .map(user => new SignUpSuccessAction({user: User}))
        .catch(error => Observable.of(new SignUpErrorAction({error: error})));
    });

  /**
   * Terminate user session.
   */
  @Effect()
  public signOut: Observable<Action> = this.actions
    .ofType(ActionTypes.SIGN_OUT)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.authenticator.signout()
        .map(value => new SignOutSuccessAction())
        .catch(error => Observable.of(new SignOutErrorAction({error: error})));
    });

  @Effect()
  public loginRedirect = this.actions.pipe(
    ofType(ActionTypes.LOGIN_REDIRECT),
    tap(authGuest => this.router.navigate(['/users/sign-in']))
  );

  /**
   * @constructor
   * @param {Actions} actions
   * @param {AuthenticatorService} authenticator
   * @param {Router} router
   */
  constructor(
    private actions: Actions,
    private authenticator: AuthenticatorService,
    private router: Router
  ) {
  }
}

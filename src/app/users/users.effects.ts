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
  Authenticate,
  Authenticated,
  AuthenticatedError,
  AuthenticatedSuccess,
  AuthenticationError,
  AuthenticationSuccess,
  SignOut,
  SignOutError,
  SignOutSuccess,
  SignUp,
  SignUpError,
  SignUpSuccess
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
  public authenticate$: Observable<Action> = this.actions$.pipe(
    ofType<Authenticate>(ActionTypes.AUTHENTICATE),
    debounceTime(500),
    map((action: Authenticate) => action.payload),
    switchMap(payload => {
      return this.authenticator.authenticate(payload.email, payload.password).pipe(
        map((user: User) => new AuthenticationSuccess({user: user})),
        catchError(error => Observable.of(new AuthenticationError({error: error})))
      );
    })
  );

  /**
   * Determine if the user is authenticated.
   */
  @Effect()
  public authenticated$: Observable<Action> = this.actions$.pipe(
    ofType<Authenticated>(ActionTypes.AUTHENTICATED),
    map((action: Authenticated) => action.payload),
    switchMap(payload => {
      return this.authenticator.authenticatedUser().pipe(
        map((user: User) => new AuthenticatedSuccess({authenticated: (user !== null), user: user})),
        catchError(error => Observable.of(new AuthenticatedError({error: error})))
      );
    })
  );

  /**
   * Create a new user.
   */
  @Effect()
  public createUser$: Observable<Action> = this.actions$.pipe(
    ofType<SignUp>(ActionTypes.SIGN_UP),
    debounceTime(500),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authenticator.create(payload.user).pipe(
        map((user: User) => {
          return new SignUpSuccess({user: user});
        }),
        catchError(error => Observable.of(new SignUpError({error: error})))
      );
    })
  );

  /**
   * Terminate user session.
   */
  @Effect()
  public signOut$: Observable<Action> = this.actions$.pipe(
    ofType<SignOut>(ActionTypes.SIGN_OUT),
    map((action: SignOut) => action.payload),
    switchMap(
      payload => {
        return this.authenticator.signout().pipe(
          map(value => new SignOutSuccess()),
          catchError(error => Observable.of(new SignOutError({error: error})))
        );
      }
    )
  );

  @Effect({ dispatch: false })
  public loginRedirect$ = this.actions$.pipe(
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
    private actions$: Actions,
    private authenticator: AuthenticatorService,
    private router: Router
  ) {}
}

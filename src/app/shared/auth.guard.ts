import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

// import rxjs
import {Observable} from 'rxjs/Observable';

// import @ngrx
import {Store, select} from '@ngrx/store';

// reducers
import {isAuthenticated, State} from '../reducers/index';
import {map} from 'rxjs/operators';
import {LoginRedirect} from '../users/actions/users.actions';

/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * @constructor
   */
  constructor(private store: Store<State>) {
  }

  /**
   * True when user is authenticated
   * @method canActivate
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.store.pipe(
      select(isAuthenticated),
      map(authCheck => {
        if (!authCheck) {
          this.store.dispatch(new LoginRedirect());
          return false;
        }

        return true;
      })
    );
  }
}

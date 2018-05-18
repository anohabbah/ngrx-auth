import {Component, OnInit} from '@angular/core';
// @ngrx
import {Store} from '@ngrx/store';
// rxjs
import {Observable} from 'rxjs/Observable';
// reducers
import {getAuthenticatedUser, State} from '../../app.reducers';
// models
import {User} from '../../core/models/user';
import {Router} from '@angular/router';
import {SignOutAction} from '../users.actions';

/**
 * The user"s account.
 * @class MyAccountComponent
 */
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  // the authenticated user
  public user: Observable<User>;

  /**
   * @constructor
   */
  constructor(private store: Store<State>, private router: Router) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // get authenticated user
    this.user = this.store.select(getAuthenticatedUser);
  }

  /**
   * Go to the home page.
   * @method home
   */
  public home() {
    this.router.navigate(['/']);
  }

  /**
   * Sign out.
   * @method home
   */
  public signOut() {
    this.store.dispatch(new SignOutAction());
  }

}

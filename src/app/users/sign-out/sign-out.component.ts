import {Component, OnDestroy, OnInit} from '@angular/core';
// @ngrx
import {Store} from '@ngrx/store';
// rxjs
// actions
import {SignOutAction} from '../users.actions';
// reducers
import {State} from '../../app.reducers';
import {Router} from '@angular/router';

@Component({
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnDestroy, OnInit {

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;

  /**
   * @constructor
   * @param {Store<State>} store
   * @param router
   */
  constructor(private store: Store<State>, private router: Router) {
  }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   */
  public ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
    this.store.dispatch(new SignOutAction());
  }

  /**
   * Go to the home page.
   */
  public home() {
    this.router.navigate(['/']);
  }

  /**
   * To to the sign up page.
   */
  public signIn() {
    this.router.navigate(['/users/sign-in']);
  }

}

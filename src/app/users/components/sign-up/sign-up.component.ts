import {Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ngrx
import {Store} from '@ngrx/store';
// rxjs
import {Observable} from 'rxjs/Observable';
// actions
import {SignUp} from '../../actions/users.actions';
// reducers
import {getSignUpError, isAuthenticated, isAuthenticationLoading, State} from '../../../reducers/index';
// models
import {User} from '../../../core/models/user';

/**
 * /users/sign-up
 * @class SignUpComponent
 */
@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy, OnInit {

  /**
   * The error if authentication fails.
   * @type {Observable<string>}
   */
  public error: Observable<string>;

  /**
   * True if the authentication is loading.
   * @type {boolean}
   */
  public loading: Observable<boolean>;

  /**
   * The authentication form.
   * @type {FormGroup}
   */
  public signupForm: FormGroup;

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;

  /**
   * @constructor
   * @param {FormBuilder} formBuilder
   * @param {Store<State>} store
   * @param router
   */
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private router: Router
  ) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // set FormGroup
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // set error
    this.error = this.store.select(getSignUpError);

    // set loading
    this.loading = this.store.select(isAuthenticationLoading);

    // subscribe to success
    this.store.select(isAuthenticated)
      .takeWhile(() => this.alive)
      .filter(authenticated => authenticated)
      .subscribe(value => {
        this.router.navigate(['/users/my-account']);
      });
  }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   * @method ngOnDestroy
   */
  public ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Go to the home page.
   * @method home
   */
  public home() {
    this.router.navigate(['/']);
  }

  /**
   * Submit the sign up form.
   * @method submit
   */
  public submit() {
    // create a new User object
    const user: User = new User();
    user.email = this.signupForm.get('email').value;
    user.firstName = this.signupForm.get('firstName').value;
    user.lastName = this.signupForm.get('lastName').value;
    user.password = this.signupForm.get('password').value;

    // trim values
    user.email.trim();
    user.firstName.trim();
    user.lastName.trim();
    user.password.trim();

    // set payload
    const payload = {
      user: user
    };

    // dispatch SignUpAction and pass in payload
    this.store.dispatch(new SignUp(payload));
  }
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// components
import {MyAccountComponent} from './components/my-account/my-account.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignOutComponent} from './components/sign-out/sign-out.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {AuthGuard} from '../shared/auth.guard';

// routes
const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: 'my-account',
    component: MyAccountComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-out',
    component: SignOutComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}

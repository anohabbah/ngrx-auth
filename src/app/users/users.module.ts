import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule} from '@angular/material';

// Components
import {MyAccountComponent} from './components/my-account/my-account.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignOutComponent} from './components/sign-out/sign-out.component';

import {AuthGuard} from '../shared/auth.guard';

const components = [MyAccountComponent, SignUpComponent, SignInComponent, SignOutComponent];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  declarations: [...components],
  providers: [AuthGuard]
})
export class UsersModule {}

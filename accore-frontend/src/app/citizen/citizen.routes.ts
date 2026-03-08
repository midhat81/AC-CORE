import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from '../shared/auth.guard'; 

export const CITIZEN_ROUTES: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    // The new secure route
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  }
];
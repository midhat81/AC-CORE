import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Login } from './login/login';
import { authGuard } from '../shared/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: AdminDashboard,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
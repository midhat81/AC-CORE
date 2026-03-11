import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AdminLayout } from './admin-layout/admin-layout';
import { AnalyticsDashboard } from './analytics-dashboard/analytics-dashboard';
import { LiveMap } from './live-map/live-map';
import { HazardList } from './hazard-list/hazard-list';
import { ReportsGeneration } from './reports-generation/reports-generation';
import { AuthGuard } from '../shared/auth.guard';

export const ADMIN_ROUTES: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: AdminLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard',           component: AnalyticsDashboard },
      { path: 'map',                 component: LiveMap },
      { path: 'hazards',             component: HazardList },
      { path: 'reports-generation',  component: ReportsGeneration },
      { path: '',                    redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
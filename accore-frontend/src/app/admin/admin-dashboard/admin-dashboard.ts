import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [HlmButtonImports],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
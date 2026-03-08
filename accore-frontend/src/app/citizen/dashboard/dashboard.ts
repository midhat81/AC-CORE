import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-citizen-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, HlmButtonImports],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private router = inject(Router);

  // Temporary mock data to structure the UI. 
  // We will replace this with a real API call later.
  myReports = [
    { id: 1, title: 'Deep Pothole', location: 'Balibago', status: 'Pending', date: '2026-03-05' },
    { id: 2, title: 'Clogged Drainage', location: 'Santo Rosario', status: 'Resolved', date: '2026-02-28' }
  ];

  onLogout() {
    // We will clear the citizen auth token here later
    this.router.navigate(['/']);
  }
}
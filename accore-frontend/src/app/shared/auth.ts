import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private adminLoginUrl = 'http://localhost:5000/api/auth/admin/login';

  login(credentials: any): Observable<any> {
    return this.http.post(this.adminLoginUrl, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('adminToken', response.token);
        }
      })
    );
  }

  getToken(): string | null {
    // Check for admin token first, then fall back to citizen token
    return localStorage.getItem('adminToken') || localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      // Decode the token payload to extract the RBAC role securely
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    } catch (error) {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
  }
}
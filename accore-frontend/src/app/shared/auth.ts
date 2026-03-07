import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/auth/admin/login';

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('adminToken', response.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  logout(): void {
    localStorage.removeItem('adminToken');
  }
}
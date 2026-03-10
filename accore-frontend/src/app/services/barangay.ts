import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarangayService { 
  // Update this URL if you changed the route path in your server.ts
  private apiUrl = 'http://localhost:5000/api/geospatial/nearest-barangay';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getNearestBarangay(longitude: number, latitude: number): Observable<any> {
    // HttpParams safely encodes the coordinates into the URL query string
    const params = new HttpParams()
      .set('longitude', longitude.toString())
      .set('latitude', latitude.toString());

    return this.http.get<any>(this.apiUrl, { 
      headers: this.getAuthHeaders(),
      params: params 
    });
  }
}
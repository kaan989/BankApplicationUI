import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl: string = 'https://localhost:7035/api/dashBoard';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterestRate } from '../Models/InterestRate.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestRateService {
  private apiUrl = 'https://localhost:7035/api/InterestRate';

  constructor(private http: HttpClient) { }

  getAllRates(): Observable<InterestRate[]> {
    return this.http.get<InterestRate[]>(this.apiUrl);
  }

  getRateById(id: number): Observable<InterestRate> {
    return this.http.get<InterestRate>(`${this.apiUrl}/${id}`);
  }

  addRate(rate: InterestRate): Observable<InterestRate> {
    return this.http.post<InterestRate>(this.apiUrl, rate);
  }

  updateRate(id: number, rate: InterestRate): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, rate);
  }

  deleteRate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

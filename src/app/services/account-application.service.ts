import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountApplication } from '../Models/AccountApplication.Model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountApplicationService {
  private apiUrl = 'https://localhost:7035/api/AccountApplication';

  constructor(private http: HttpClient) { }

  getAllApplications(): Observable<AccountApplication[]> {
    return this.http.get<AccountApplication[]>(`${this.apiUrl}`);
  }

  getApplicationById(id: number): Observable<AccountApplication> {
    return this.http.get<AccountApplication>(`${this.apiUrl}/${id}`);
  }

  createApplication(application: AccountApplication): Observable<AccountApplication> {
    return this.http.post<AccountApplication>(`${this.apiUrl}`, application);
  }

  updateApplication(application: AccountApplication): Observable<AccountApplication> {
    return this.http.put<AccountApplication>(`${this.apiUrl}/${application.id}`, application);
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getApplicationsByUserId(userId: string): Observable<AccountApplication[]> {
    return this.http.get<AccountApplication[]>(`${this.apiUrl}/aplication/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Hata işleme
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Bilinmeyen bir hata oluştu!';
    if (error.error instanceof ErrorEvent) {
      // Client-side hata
      errorMessage = `Hata: ${error.error.message}`;
    } else {
      // Server-side hata
      errorMessage = `Sunucu Hatası: ${error.status}, Mesaj: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

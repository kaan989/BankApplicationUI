import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../Models/AppUser.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private apiUrl = 'https://localhost:7035/api/AppUser';

  constructor(private http: HttpClient) { }

  // Tüm kullanıcıları getir
  getAllUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiUrl}`);
  }

  // Seçilen kullanıcının detaylarını getir
  getUserById(userId: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.apiUrl}/${userId}`);
  }

  
}
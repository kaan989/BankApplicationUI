import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppUser } from '../Models/AppUser.Model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7035/api/AppUser";

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    const loginModel = { email, password };

    return this.http.post(`${this.baseUrl}/login`, loginModel).pipe(
      map((response: any) => {
        // API'den gelen token ve diğer bilgileri localStorage'a kaydediyoruz
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('roles', JSON.stringify(response.roles));

        // Yönlendirme işlemini burada yapabiliriz
        if (response.roles.includes('admin')) {
          // Admin ise, admin sayfasına yönlendir
          window.location.href = '/adminpage'; // veya Angular router ile yönlendirme yapabilirsiniz
        } else if(response.roles.includes('user')) {
          // Diğer kullanıcılar için anasayfa
          window.location.href = '/homepage'; // veya Angular router ile yönlendirme yapabilirsiniz
        }
        else{
          window.location.href = '/employee-applications';
        }

        return response;
      })
    );
  }

  logout() {
    // Kullanıcı bilgilerini localStorage'dan temizle
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Token varsa kullanıcı giriş yapmış demektir
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserRole(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  getUserById(id: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.baseUrl}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../Models/Account.Model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = 'https://localhost:7035/api/Account';

  constructor(private http: HttpClient) { }

  // Tüm hesapları getir
  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}`);
  }

  // Belirli bir kullanıcıya ait hesapları getir
  getAccountsByUserId(userId: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Belirli bir hesabı getir
  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${id}`);
  }

  // Yeni hesap oluştur
  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, account);
  }

  // Hesabı sil
  deleteAccount(accountId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${accountId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransferDto } from '../Models/TransferDto.Model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'https://localhost:7035/api/Transaction'; // API adresinizi buraya yazın

  constructor(private http: HttpClient) { }

  transfer(transferDto: TransferDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer`, transferDto);
  }
}
import { Component, OnInit } from '@angular/core';
import { Account } from '../../Models/Account.Model';
import { AccountService } from '../../services/account.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-all-accounts',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-all-accounts.component.html',
  styleUrl: './admin-all-accounts.component.css'
})
export class AdminAllAccountsComponent implements OnInit {
  accounts: Account[] = [];
  errorMessage: string = '';
  

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAllAccounts().subscribe(
      (data) => {
        this.accounts = data;
      },
      (error) => {
        this.errorMessage = 'Hesapları yüklerken bir hata oluştu.';
        console.error('Hata:', error);
      }
    );
  }

  getAccountTypeName(type: number): string {
    return type === 0 ? 'Vadeli' : 'Vadesiz';
  }

  confirmDelete(accountId: number): void {
    Swal.fire({
      title: 'Hesabı Silmek Üzeresiniz',
      text: 'Bu işlemi geri alamazsınız!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAccount(accountId);
      }
    });
  }
  
  deleteAccount(accountId: number): void {
    this.accountService.deleteAccount(accountId).subscribe(
      () => {
        Swal.fire('Silindi!', 'Hesap başarıyla silindi.', 'success');
        this.loadAccounts(); // Hesapları tekrar yükleyerek güncelleme yapın
      },
      (error) => {
        Swal.fire('Hata!', 'Hesap silinirken bir hata oluştu.', 'error');
        console.error('Hata:', error);
      }
    );
  }
}
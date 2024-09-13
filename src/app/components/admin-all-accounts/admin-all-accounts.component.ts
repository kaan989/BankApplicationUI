import { Component, OnInit } from '@angular/core';
import { Account } from '../../Models/Account.Model';
import { AccountService } from '../../services/account.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppUser } from '../../Models/AppUser.Model';
import { AppUserService } from '../../services/app-user.service';

@Component({
  selector: 'app-admin-all-accounts',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-all-accounts.component.html',
  styleUrl: './admin-all-accounts.component.css'
})
export class AdminAllAccountsComponent implements OnInit {
  isAdmin: boolean = false;
  accounts: Account[] = [];
  errorMessage: string = '';
  usersMap: { [key: string]: AppUser } = {};

  constructor(private accountService: AccountService, private appUserService:AppUserService) { }

  ngOnInit(): void {
    this.checkUserRole();
    this.loadAccounts();
  }
  
  loadAccounts(): void {
    this.accountService.getAllAccounts().subscribe(
      (data) => {
        this.accounts = data;
        this.loadUserDetails(); 
      },
      (error) => {
        this.errorMessage = 'Hesapları yüklerken bir hata oluştu.';
        console.error('Hata:', error);
      }
    );
  }
  
  loadUserDetails(): void {
    this.accounts.forEach(account => {
      if (account.appUserId !== null && account.appUserId !== undefined) {
        this.appUserService.getUserById(account.appUserId).subscribe(
          (user) => {
            this.usersMap[account.appUserId!] = user; 
          },
          (error) => {
            console.error(`Kullanıcı bilgileri alınırken hata oluştu. AppUserId: ${account.appUserId}`, error);
          }
        );
      } else {
        console.warn(`Account ID ${account.id} için appUserId mevcut değil.`);
      }
    });
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

 
  

  getUserDetails(appUserId: string): string {
    const user = this.usersMap[appUserId];
    return user ? `${user.firstName} ${user.lastName}` : 'Kullanıcı bilgileri yükleniyor...';
  }

  checkUserRole(): void {
    const roleString = localStorage.getItem('roles');
    if (roleString) {
      try {
        // JSON'u çözümleyin
        const roles = JSON.parse(roleString);
  
        // Dizinin `admin` rolünü içerip içermediğini kontrol edin
        if (roles.includes('admin')) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
          this.errorMessage = 'Bu sayfayı görüntüleme izniniz yok.';
        }
      } catch (e) {
        this.isAdmin = false;
        this.errorMessage = 'Kullanıcı rolü verisi geçersiz.';
        console.error('JSON çözümleme hatası:', e);
      }
    } else {
      this.isAdmin = false;
      this.errorMessage = 'Kullanıcı rolü bulunamadı.';
    }
  }


}
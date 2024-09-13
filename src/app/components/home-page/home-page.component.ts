import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account, AccountType } from '../../Models/Account.Model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isUser: boolean = false;
  errorMessage: string = '';
  vadeliAccounts: Account[] = [];
  vadesizAccounts: Account[] = [];

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.checkUserRole();
    this.loadAccounts();
  }

  loadAccounts(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.accountService.getAccountsByUserId(userId).subscribe({
        next: (data) => {
          // AccountType enum değerlerinin sayısal mı yoksa string mi olduğunu kontrol edin
          this.vadeliAccounts = data.filter(account => account.type === AccountType.Vadeli);
          this.vadesizAccounts = data.filter(account => account.type === AccountType.Vadesiz);
        },
        error: (err) => {
          console.error('Error fetching accounts', err);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }

  getAccountTypeName(type: AccountType): string {
    // Enum'ı doğrudan kullanarak isimlerini döndürün
    return type === AccountType.Vadeli ? 'Vadeli' : 'Vadesiz';
  }

  openApplicationForm() {
    this.router.navigate(['/application-form']);
  }

  checkUserRole(): void {
    const roleString = localStorage.getItem('roles');
    if (roleString) {
      try {
        // JSON'u çözümleyin
        const roles = JSON.parse(roleString);
  
        // Dizinin `admin` rolünü içerip içermediğini kontrol edin
        if (roles.includes('user')) {
          this.isUser = true;
        } else {
          this.isUser = false;
          this.errorMessage = 'Bu sayfayı görüntüleme izniniz yok.';
        }
      } catch (e) {
        this.isUser = false;
        this.errorMessage = 'Kullanıcı rolü verisi geçersiz.';
        console.error('JSON çözümleme hatası:', e);
      }
    } else {
      this.isUser = false;
      this.errorMessage = 'Kullanıcı rolü bulunamadı.';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TransferDto } from '../../Models/TransferDto.Model';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'] // Düzeltilmiş stil dosyası yolu
})
export class TransferComponent implements OnInit {
  accounts: any[] = []; // Hesapların listesi
  fromAccountId: number | null = null;
  toAccountNumber: string = '';
  amount: number | null = null;
  isTransferTypeSelected: boolean = false;
  transferType: 'internal' | 'external' = 'internal'; // Transfer türü

  // AccountType enum'u
  AccountType = {
    Vadeli: 0,
    Vadesiz: 1
  };

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    // Hesapları yükleyin
    this.loadAccounts();
  }

  loadAccounts(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.accountService.getAccountsByUserId(userId).subscribe({
        next: (data) => {
          this.accounts = data; // Hesapları doğrudan atayın
        },
        error: (err) => {
          console.error('Error fetching accounts', err);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }

  selectTransferType(type: 'internal' | 'external'): void {
    this.transferType = type;
    this.isTransferTypeSelected = true;
  }

  transfer(): void {
    debugger;
    if (this.fromAccountId && this.amount) {
      const fromAccount = this.accounts.find(accounts => accounts.id === this.fromAccountId);

      
  
      if (fromAccount && fromAccount.balance < this.amount) {
        Swal.fire({
          title: 'Hata!',
          text: 'Gönderen hesapta yeterli bakiye bulunmuyor.',
          icon: 'error',
          confirmButtonText: 'Tamam'
        });
        return;
      }
  
      const transferDto: TransferDto = {
        fromAccountId: this.fromAccountId,
        toAccountNumber: this.transferType === 'internal' ? this.toAccountNumber : this.toAccountNumber,
        amount: this.amount
      };
  
      this.transactionService.transfer(transferDto).subscribe(
        response => {
          Swal.fire({
            title: 'Başarılı!',
            text: 'Transfer işlemi başarılı.',
            icon: 'success',
            confirmButtonText: 'Tamam'
          });
          // Başarı mesajı ve hesapları yenile
          this.loadAccounts();
        },
        error => {
          // Hata mesajını detaylı gösterme
          Swal.fire({
            title: 'Hata!',
            text: `Transfer işlemi başarısız: ${error.error.message || error.message}`,
            icon: 'error',
            confirmButtonText: 'Tamam'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Uyarı!',
        text: 'Lütfen tüm alanları doldurunuz.',
        icon: 'warning',
        confirmButtonText: 'Tamam'
      });
    }
  }
  
  

  // Hesap türünü anlamlı bir metne dönüştürür
  getAccountTypeName(type: number): string {
    switch (type) {
      case this.AccountType.Vadeli:
        return 'Vadeli';
      case this.AccountType.Vadesiz:
        return 'Vadesiz';
      default:
        return 'Unknown';
    }
  }
}

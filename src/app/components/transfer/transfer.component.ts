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
    if (this.fromAccountId && this.amount) {
      const transferDto: TransferDto = {
        fromAccountId: this.fromAccountId,
        toAccountNumber: this.transferType === 'internal' ? this.toAccountNumber : this.toAccountNumber,
        amount: this.amount
      };

      this.transactionService.transfer(transferDto).subscribe(
        response => {
          Swal.fire({
            title: 'Success!',
            text: 'Transfer successful',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          // Başarı mesajı ve hesapları yenile
          this.loadAccounts();
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Transfer failed: ' + error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill in all fields',
        icon: 'warning',
        confirmButtonText: 'OK'
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

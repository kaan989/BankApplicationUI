import { Component, OnInit } from '@angular/core';
import { AccountApplicationService } from '../../services/account-application.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppUser } from '../../Models/AppUser.Model';
import { AuthService } from '../../services/auth.service';
import { AppUserService } from '../../services/app-user.service';
import { Account, AccountType } from '../../Models/Account.Model';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'] // Corrected 'styleUrls'
})
export class CreateAccountComponent implements OnInit {
  isCustomer: boolean = false;
  errorMessage: string = '';
  application: any = {};
  account: Account = {
    id: 0,
    accountNumber: '',
    balance: 0,
    type: AccountType.Vadesiz, // Default type
    createdAt: new Date(),
    lastInterestAppliedDate: null,
    appUserId: ''
  };
  showUserInfo: boolean = false;
  AccountType = AccountType; // Make enum accessible in template

  toggleUserInfo(): void {
    this.showUserInfo = !this.showUserInfo;
  }

  constructor(
    private appService: AccountApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private appUserService: AppUserService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.appService.getApplicationById(id).subscribe(application => {
      this.application = application;
    });
  }

  createAccount(): void {

    const userId = this.application.appUserId; 
    const type = this.account.type;
    if (userId) {
        this.account.appUserId = userId;
        this.account.type = type;
        this.accountService.createAccount(this.account).subscribe(
            (response: Account) => {
                Swal.fire('Success', 'Account Created Successfully!', 'success').then(() => {
                    this.router.navigate(['/employee-applications']);
                });
            },
            (error) => {
                console.error('Error creating account:', error);
                if (error.error && error.error.errors) {
                    console.log('Validation errors:', error.error.errors);
                    Swal.fire('Error', 'Validation errors occurred. Please check your input.', 'error');
                } else {
                    Swal.fire('Error', 'There was a problem creating the account.', 'error');
                }
            }
        );
    } else {
        Swal.fire('Warning', 'User ID is required to create an account.', 'warning');
    }
  }

  getUserInfo(): void {
    const userId = this.application.appUserId;
    if (userId) {
      this.appUserService.getUserById(userId).subscribe(
        (user: AppUser) => {
          this.application.firstName = user.firstName || '';
          this.application.lastName = user.lastName || '';
          this.application.idNumber = user.idNumber || '';
          this.application.address = user.address || '';
        },
        error => {
          console.error('Error fetching user info', error);
        }
      );
    } else {
      console.warn('User ID is required to fetch user info');
    }
  }

  checkUserRole(): void {
    const roleString = localStorage.getItem('roles');
    if (roleString) {
      try {
        // JSON'u çözümleyin
        const roles = JSON.parse(roleString);
  
        // Dizinin `admin` rolünü içerip içermediğini kontrol edin
        if (roles.includes('customer')) {
          this.isCustomer = true;
        } else {
          this.isCustomer = false;
          this.errorMessage = 'Bu sayfayı görüntüleme izniniz yok.';
        }
      } catch (e) {
        this.isCustomer = false;
        this.errorMessage = 'Kullanıcı rolü verisi geçersiz.';
        console.error('JSON çözümleme hatası:', e);
      }
    } else {
      this.isCustomer = false;
      this.errorMessage = 'Kullanıcı rolü bulunamadı.';
    }
  }
}

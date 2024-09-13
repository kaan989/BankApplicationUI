import { Component, OnInit } from '@angular/core';
import { AccountApplication } from '../../Models/AccountApplication.Model';
import { AccountApplicationService } from '../../services/account-application.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-allaplications',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-allaplications.component.html',
  styleUrls: ['./admin-allaplications.component.css']
})
export class AdminAllaplicationsComponent implements OnInit {  
  isAdmin: boolean = false;
  applications: AccountApplication[] = [];
  errorMessage: string = '';
  users: { [key: string]: any } = {}; 

  constructor(
    private accountApplicationService: AccountApplicationService,
    private authService: AuthService
  ) { }

  checkUserRole(): void {
    const roleString = localStorage.getItem('roles');
    if (roleString) {
      try {
        const roles = JSON.parse(roleString);
        if (roles.includes('admin')) {
          this.isAdmin = true;
          this.getAllApplications();
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

  ngOnInit(): void {
    this.checkUserRole();
  }

  getAllApplications(): void {
    this.accountApplicationService.getAllApplications().subscribe(
      (data) => {
        this.applications = data;
        this.loadUsers(); 
      },
      (error) => {
        this.errorMessage = 'Başvurular alınırken hata oluştu.';
        console.error('Başvurular alınırken hata:', error);
      }
    );
  }

  loadUsers(): void {
    const userIds = [...new Set(this.applications.map(app => app.appUserId))];
    const userRequests = userIds.map(id => this.authService.getUserById(id));
    
    forkJoin(userRequests).subscribe(
      (users) => {
        users.forEach(user => {
          this.users[user.id] = user;
        });
      },
      (error) => {
        this.errorMessage = 'Kullanıcı bilgileri alınırken hata oluştu.';
        console.error('Kullanıcı bilgileri alınırken hata:', error);
      }
    );
  }
  
  getUserFullName(userId: string): string {
    const user = this.users[userId];
    return user ? `${user.firstName} ${user.lastName}` : 'Bilinmiyor';
  }

  deleteApplication(id: number): void {
    Swal.fire({
      title: 'Emin misiniz?',
      text: 'Bu başvuruyu silmek istediğinizden emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Hayır, iptal et'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountApplicationService.deleteApplication(id).subscribe(() => {
          Swal.fire(
            'Silindi!',
            'Başvuru başarıyla silindi.',
            'success'
          );
          this.getAllApplications(); 
        }, (error) => {
          Swal.fire(
            'Hata!',
            'Başvuru silinirken bir hata oluştu.',
            'error'
          );
          console.error('Başvuru silinirken hata:', error);
        });
      }
    });
  }
}

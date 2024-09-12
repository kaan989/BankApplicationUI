import { Component, OnInit } from '@angular/core';
import { AccountApplication } from '../../Models/AccountApplication.Model';
import { AccountApplicationService } from '../../services/account-application.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-allaplications',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-allaplications.component.html',
  styleUrl: './admin-allaplications.component.css'
})
export class AdminAllaplicationsComponent implements OnInit {  
  isAdmin: boolean = false;
  applications: AccountApplication[] = [];
  errorMessage: string = '';

  constructor(private accountApplicationService: AccountApplicationService, private authService: AuthService) { }
  checkUserRole(): void {
    const roleString = localStorage.getItem('roles');
    if (roleString) {
      try {
        // JSON'u çözümleyin
        const roles = JSON.parse(roleString);
  
        // Dizinin `admin` rolünü içerip içermediğini kontrol edin
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
    this.getAllApplications();
  }

  getAllApplications(): void {
    this.accountApplicationService.getAllApplications().subscribe(
      (data) => {
        console.log(data);
        this.applications = data;
      },
      (error) => {
        this.errorMessage = 'Başvurular alınırken hata oluştu.';
        console.error('Başvurular alınırken hata:', error);
      }
    );
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
          this.getAllApplications(); // Başvuruları yeniden yükleyin
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
import { Component, OnInit } from '@angular/core';
import { AccountApplicationService } from '../../services/account-application.service';
import Swal from 'sweetalert2';
import { AccountApplication } from '../../Models/AccountApplication.Model';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-employee-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-applications.component.html',
  styleUrl: './employee-applications.component.css'
})
export class EmployeeApplicationsComponent implements OnInit {
  applications: AccountApplication[] = [];

  constructor(private appService: AccountApplicationService, private router: Router) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    this.appService.getAllApplications().subscribe(
      (data) => {
        console.log('Data received from API:', data); // API'den gelen veriyi kontrol edin
        this.applications = data.filter(app => !app.isApprovel && app.pending);
      },
      (error) => {
        console.error('Error loading applications:', error); // Hata mesajını kontrol edin
      }
    );
  }
  
  acceptApplication(id: number): void {
    this.appService.getApplicationById(id).subscribe(application => {
      application.isApprovel = true;
      application.pending = false;
      this.appService.updateApplication(application).subscribe(() => {
        Swal.fire('Success', 'Application Accepted! Redirecting to account creation...', 'success').then(() => {
          // Başarı mesajını gösterdikten sonra yönlendirin
          this.router.navigate(['/create-account', id]); // Yönlendirme yapılacak sayfa ve parametre
        });
      });
    });
  }

  rejectApplication(id: number): void {
    this.appService.getApplicationById(id).subscribe(application => {
      application.isApprovel = false;
      application.pending = false;
      this.appService.updateApplication(application).subscribe(() => {
        Swal.fire('Başarılı', 'Başvuru reddedildi!', 'success').then(() => {
          // Başarı mesajını gösterdikten sonra uygulamaları yeniden yükleyin
          this.loadApplications();
        });
      });
    });
  }
  }


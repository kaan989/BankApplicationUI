import { Component, OnInit } from '@angular/core';
import { AccountApplication } from '../../Models/AccountApplication.Model';
import { AccountApplicationService } from '../../services/account-application.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-applications',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './view-applications.component.html',
  styleUrl: './view-applications.component.css'
})
export class ViewApplicationsComponent implements OnInit {

  applications: AccountApplication[] = [];
  errorMessage: string = '';

  constructor(private accountApplicationService: AccountApplicationService) { }

  ngOnInit(): void {
    this.getUserApplications();
  }

  getUserApplications(): void {
    const userId = localStorage.getItem('userId');
    
    if (userId !== null) {
      this.accountApplicationService.getApplicationsByUserId(userId).subscribe(
        (data) => {
          console.log(data);
          this.applications = data;
        },
        (error) => {
          this.errorMessage = error;
          console.error('Başvurular alınırken hata:', error);
        }
      );
    } else {
      this.errorMessage = 'Kullanıcı ID bulunamadı.';
      console.error('Kullanıcı ID null.');
    }
  }
  
}
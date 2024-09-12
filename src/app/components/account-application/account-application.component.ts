import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountApplicationService } from '../../services/account-application.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-application',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './account-application.component.html',
  styleUrl: './account-application.component.css'
})
export class AccountApplicationComponent implements OnInit {
  applicationForm!: FormGroup;

  constructor(private fb: FormBuilder, private accountAppService: AccountApplicationService) { }

  ngOnInit(): void {
    const appUserId = localStorage.getItem('userId') || '';

    this.applicationForm = this.fb.group({
      id: [0],
      appUserId: [appUserId, Validators.required],
      age: [0, Validators.required],
      monthlyIncome: [0, Validators.required],
      isVadeli: [false],  // Checkbox kontrolü
      pending: [true],  // Varsayılan olarak true
      isApproved: [false]  // Varsayılan olarak false
    });

    // Checkbox değişimlerini dinle
    this.applicationForm.get('isVadeli')?.valueChanges.subscribe(isVadeli => {
      // isVadeli değeri dinamik olarak ayarlanır
      this.applicationForm.patchValue({ isVadeli });
    });
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      this.accountAppService.createApplication(this.applicationForm.value).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Başarıyla Kaydedildi!',
          text: 'Hesap başvurunuz başarıyla gönderildi.',
          confirmButtonText: 'Tamam'
        }).then(() => {
          this.applicationForm.reset();
        });
      }, error => {
        console.error('Error submitting application', error);

        Swal.fire({
          icon: 'error',
          title: 'Hata!',
          text: 'Başvuru sırasında bir hata oluştu.',
          confirmButtonText: 'Tamam'
        });
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Dikkat!',
        text: 'Formunuzda eksik veya hatalı alanlar var.',
        confirmButtonText: 'Tamam'
      });
    }
  }
}
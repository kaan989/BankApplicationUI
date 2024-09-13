import { Component, OnInit } from '@angular/core';
import { InterestRate } from '../../Models/InterestRate.Model';
import { InterestRateService } from '../../services/interest-rate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountApplication } from '../../Models/AccountApplication.Model';


@Component({
  selector: 'app-admin-interest-rate',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-interest-rate.component.html',
  styleUrl: './admin-interest-rate.component.css'
})
export class AdminInterestRateComponent implements OnInit {
  isAdmin: boolean = false;
  errorMessage: string = '';
  rates: InterestRate[] = [];
  selectedRate: InterestRate = {
    rate: 0,
    effectiveFrom: new Date()
  };

  constructor(private interestRateService: InterestRateService) { }

  ngOnInit(): void {
    this.checkUserRole();
    this.loadRates();
  }

  loadRates(): void {
    this.interestRateService.getAllRates().subscribe(
      data => this.rates = data,
      error => console.error('Error loading rates', error)
    );
  }

  selectRate(rate: InterestRate): void {
    this.selectedRate = { ...rate };
  }

  addRate(rate: InterestRate): void {
    // `id` boş bırakılır çünkü yeni bir kayıt ekleniyor
    this.interestRateService.addRate(rate).subscribe(
      () => {
        this.loadRates();
        this.resetForm();
      },
      error => console.error('Error adding rate', error)
    );
  }

  updateRate(rate: InterestRate): void {
    if (rate.id) {
      this.interestRateService.updateRate(rate.id, rate).subscribe(
        () => {
          this.loadRates();
          this.resetForm();
        },
        error => console.error('Error updating rate', error)
      );
    }
  }

  deleteRate(id: number): void {
    this.interestRateService.deleteRate(id).subscribe(
      () => this.loadRates(),
      error => console.error('Error deleting rate', error)
    );
  }

  public resetForm(): void {
    this.selectedRate = {
      rate: 0,
      effectiveFrom: new Date()
    };
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
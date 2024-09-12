import { Component, OnInit } from '@angular/core';
import { InterestRate } from '../../Models/InterestRate.Model';
import { InterestRateService } from '../../services/interest-rate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-interest-rate',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-interest-rate.component.html',
  styleUrl: './admin-interest-rate.component.css'
})
export class AdminInterestRateComponent implements OnInit {
  rates: InterestRate[] = [];
  selectedRate: InterestRate = {
    rate: 0,
    effectiveFrom: new Date()
  };

  constructor(private interestRateService: InterestRateService) { }

  ngOnInit(): void {
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
}
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  isAdmin: boolean = false;
  errorMessage: string = '';
  dashboardData: any = {};
  private barChart: Chart<'bar'> | undefined;
  private pieChart: Chart<'pie'> | undefined;
  private applicationPieChart: Chart<'pie'> | undefined;

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables); // Chart.js bileşenlerini kaydedin
  }

  ngOnInit(): void {
    this.checkUserRole();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe(
      data => {
        this.dashboardData = data;
        this.createCharts(); // Grafik verileri yüklendiğinde grafikleri oluşturun
      },
      error => {
        console.error('Dashboard verileri alınırken hata:', error);
      }
    );
  }

  createCharts(): void {
    // Var olan grafikleri temizle
    if (this.barChart) {
      this.barChart.destroy();
    }
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    if (this.applicationPieChart) {
      this.applicationPieChart.destroy();
    }

    const barChartCtx = document.getElementById('barChart') as HTMLCanvasElement;
    const pieChartCtx = document.getElementById('pieChart') as HTMLCanvasElement;
    const applicationPieChartCtx = document.getElementById('applicationPieChart') as HTMLCanvasElement;

    // Bar Chart
    this.barChart = new Chart(barChartCtx, {
      type: 'bar',
      data: {
        labels: ['Vadeli Hesaplar', 'Vadesiz Hesaplar'],
        datasets: [{
          label: 'Hesap Türleri',
          data: [this.dashboardData.fixedAccounts, this.dashboardData.currentAccounts],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Pie Chart
    this.pieChart = new Chart(pieChartCtx, {
      type: 'pie',
      data: {
        labels: ['Vadeli Hesaplar', 'Vadesiz Hesaplar'],
        datasets: [{
          label: 'Bakiye Dağılımı',
          data: [this.dashboardData.fixedAccounts, this.dashboardData.currentAccounts],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

    // Başvuru Durumları Pie Chart
    this.applicationPieChart = new Chart(applicationPieChartCtx, {
      type: 'pie',
      data: {
        labels: ['Onaylı Başvurular', 'Reddedilmiş Başvurular'],
        datasets: [{
          label: 'Başvuru Durumları',
          data: [this.dashboardData.approvedApplications, this.dashboardData.rejectedApplications],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
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

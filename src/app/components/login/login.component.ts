import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Giriş formu submit olduğunda bu fonksiyon çalışır
  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Giriş başarılı', response);
        // Giriş başarılıysa, yönlendirme yapabilirsiniz
        this.router.navigate(['/homepage']);
      },
      (error) => {
        console.error('Giriş hatalı', error);
        this.errorMessage = 'Giriş başarısız! Lütfen bilgilerinizi kontrol edin.';
      }
    );
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}

import { Component } from '@angular/core';
import { AppUser } from '../../Models/AppUser.Model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: AppUser = {
    id: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    address: '',
    idNumber: '',
    username: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']); // Kayıt başarılıysa giriş sayfasına yönlendirilir
      },
      error: (err) => {
        this.errorMessage = 'Registration failed: ' + err.error.message;
      }
    });
  }

  onLogin(){
    this.router.navigate(['/login']);
  }
}
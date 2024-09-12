import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isRole(role: string): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes(role);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    // Re-route to login or home
  }

  onLogin(){
    this.router.navigate(['/login']);
  }

  onMyApplication(){
    this.router.navigate(["/myapplications"])
  }

  onHomePage(){
    this.router.navigate(['/homepage'])
  }
  
  onApplication(){
    this.router.navigate(['/allapplications'])
  }

  onAdmin(){
    this.router.navigate(['/adminpage'])
  }

  onAllAccount(){
    this.router.navigate(['/adminallaccount'])
  }

  onTransfer(){
    this.router.navigate(['/transfer']);
  }
}

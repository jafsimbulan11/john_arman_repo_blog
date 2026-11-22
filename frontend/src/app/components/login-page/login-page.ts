import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth';
import { TokenStorage } from '../../services/token-storage';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  errorMessage = '';

  constructor(
    private authService: AuthServiceService,
    private tokenStorage: TokenStorage,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl || '/']);
    }
  }

  onSubmit() {
    this.errorMessage = '';
    const { username, password } = this.form;
    this.http.post<LoginPostData>('http://localhost:7161/api/Login/login', { username, password }).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.id_token);
        this.tokenStorage.saveUser(data.id);
        this.authService.isLoggedIn = true;
        this.router.navigate([this.authService.redirectUrl || '/']);
      },
      error: (err) => {
        this.errorMessage = typeof err.error === 'string' && err.error
          ? err.error
          : 'Login failed. Check your credentials or make sure the API is running on port 7161.';
      }
    });
  }
}

export interface LoginPostData {
  id_token: string;
  id: number;
}

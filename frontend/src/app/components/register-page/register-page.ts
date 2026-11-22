import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-register-page',
  styleUrl: './register-page.css',
  templateUrl: './register-page.html',
})
export class RegisterPage implements OnInit {
  form: any = {
    username: null,
    password: null,
    firstName: null,
    lastName: null
  };
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.http.post('http://localhost:7161/api/Login/register', this.form, { responseType: 'text' }).subscribe({
      next: () => {
        this.route.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = typeof err.error === 'string' && err.error
          ? err.error
          : 'Registration failed. Make sure the API is running on port 7161.';
      }
    });
  }
}

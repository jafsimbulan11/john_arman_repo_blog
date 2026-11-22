import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TokenStorage } from '../../services/token-storage';
import { AuthServiceService } from '../../services/auth';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-add-post',
  styleUrl: './add-post.css',
  templateUrl: './add-post.html',
})
export class AddPost implements OnInit {
  form = {
    title: '',
    body: '',
  };
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.authService.redirectUrl = '/add-post';
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.form.title.trim() || !this.form.body.trim()) {
      this.errorMessage = 'Please enter both a title and body.';
      return;
    }

    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .post('http://localhost:7161/api/post/add', this.form, {
        headers,
        responseType: 'text',
      })
      .subscribe({
        next: () => {
          this.authService.redirectUrl = '';
          this.router.navigate(['/']);
        },
        error: (err) => {
          if (err.status === 401) {
            this.tokenStorage.signOut();
            this.authService.redirectUrl = '/add-post';
            this.router.navigate(['/login']);
            return;
          }
          this.errorMessage =
            typeof err.error === 'string' && err.error
              ? err.error
              : 'Failed to create post. Make sure the API is running.';
        },
      });
  }
}

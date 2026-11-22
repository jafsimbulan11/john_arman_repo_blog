import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-post-detail',
  styleUrl: './post-detail.css',
  templateUrl: './post-detail.html',
})
export class PostDetail implements OnInit {

  private routeSub: Subscription = new Subscription();
  private id: number = 0;

  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initData();
    });
  }

  initData(): void {
    this.http.get<Post>("http://localhost:7161/api/post/" + this.id).subscribe({
      next: (data: Post) => {
        this.post = data;
        this.cdr.detectChanges();
        console.log(this.post);
      },
      error: (err) => console.error('Error fetching detail:', err)
    });
  }
}

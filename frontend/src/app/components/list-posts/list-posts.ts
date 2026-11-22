import { Component, ChangeDetectorRef, OnInit } from '@angular/core'; 
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
@Component({
  standalone: true,
  imports: [RouterLink, CommonModule],
  selector: 'app-list-posts',
  templateUrl: './list-posts.html',
  styleUrl: './list-posts.css',
})
export class ListPosts implements OnInit {

  posts: Post[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.http.get<Post[]>('http://localhost:7161/api/post').subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.cdr.detectChanges(); 
        console.log(this.posts);
      },
      error: (err) => console.error('error', err)
    });
  }

}

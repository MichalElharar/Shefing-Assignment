import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { Post } from '../../Models/Post';
import { CommonModule } from '@angular/common';
import { User } from '../../Models/User';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../new-post/new-post.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit, OnChanges {
  constructor(private usersService: UsersService, public dialog: MatDialog) { }
  @Input() user: User | undefined;
  userPostsList?: Post[];
  ngOnChanges(): void {
    this.usersService.getUserPosts(this.user?.id).then(res => this.userPostsList = res);
  }
  ngOnInit(): void {
  }

  openNewPostDialog(): void {
    let newPost: Post = new Post();
    newPost.userId = this.user?.id;
    const dialogRef = this.dialog.open(NewPostComponent, {
      data: newPost,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        newPost = result;
        this.usersService.addUserPost(newPost).then(res => this.userPostsList?.unshift(res));
      }
    });
  }
}

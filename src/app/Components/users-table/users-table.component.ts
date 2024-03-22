import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { User } from '../../Models/User';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { UserPostsComponent } from '../user-posts/user-posts.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Post } from '../../Models/Post';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    UserPostsComponent,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent implements OnInit {
  constructor(public usersService: UsersService) { }

  usersList: MatTableDataSource<Post> = new MatTableDataSource();
  displayedColumns: string[] = ["name", "email", "companyName"];
  selectedUser?: User;

  ngOnInit(): void {
    this.usersService.getUsers().then(res => this.usersList = new MatTableDataSource(res));
  }

  showUserPosts(user?: User) {
    this.selectedUser = user;
  }

  applyFilterByNameOrEmail(event: Event) {
    this.selectedUser = undefined;
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersList!.filter = filterValue.trim().toLowerCase();
    this.usersList.filterPredicate = (user: User, filter: string): boolean => {
      return user.name!.trim().toLowerCase().includes(filter) || user.email!.trim().toLowerCase().includes(filter);
    };
  }
}

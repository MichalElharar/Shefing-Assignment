import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersTableComponent } from './Components/users-table/users-table.component';
import { UsersService } from './Services/users.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UsersTableComponent, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ShefingAssignment';
  constructor(public usersService: UsersService, private cdref: ChangeDetectorRef) { }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}

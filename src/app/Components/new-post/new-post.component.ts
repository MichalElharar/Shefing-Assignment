import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Post } from '../../Models/Post';
import { FormsModule } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})

export class NewPostComponent {
  constructor(
    public dialogRef: MatDialogRef<NewPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

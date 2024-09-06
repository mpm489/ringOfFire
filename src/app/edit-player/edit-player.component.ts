import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';





@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, CommonModule, MatFormFieldModule, FormsModule,],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  name: string = '';
  selectedImage: string = '';
  imges: string[] = ['2.png', '1.webp', 'monkey.png', 'pinguin.svg' ];

  constructor(private dialogRef: MatDialogRef<EditPlayerComponent>) {}

  initializePlayer(name: string, img: string) {
    this.name = name;
    this.selectedImage = img;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }



}

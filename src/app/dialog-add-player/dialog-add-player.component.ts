import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule,
    MatInputModule, FormsModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';
  selectedImage: string = '';
  imges: string[] = [
    '2.png', '1.webp', 'monkey.png', 'pinguin.svg'
  ];

  constructor(
    private dialogRef: MatDialogRef<DialogAddPlayerComponent>
  ) { }

  onNoClick() {
    this.dialogRef.close();
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }
}

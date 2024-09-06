import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, GameInfoComponent, PlayerComponent, MatButtonModule, MatIconModule, DialogAddPlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  baseOffset: number = 70;
  overgameAnimation: boolean = false;
  pickCardAnimation: boolean = false;
  warningMessage: boolean = false;
  showPlayerLimitMessage: boolean = false;
  currentCard: string = '';
  game: Game;
  dialog = inject(MatDialog);


  constructor() {
    this.newGame();
    const screenWidth = window.innerWidth;
    this.adjustOffset(screenWidth);
  }

  newGame() {
    this.game = new Game();
  }

  adjustOffset(screenWidth: number) {
    // Passe den Wert für kleine Bildschirme an
    if (screenWidth <= 720) {
      this.baseOffset = 40;
    } else {
      this.baseOffset = 70;
    }
  }

  takeCard() {
    if (this.game.players.length === 0) {
      this.showWarningMessage();
    } else if (!this.pickCardAnimation) {
      this.pickCard();
    }
  }

  showWarningMessage() {
    this.warningMessage = true;
    setTimeout(() => {
      this.warningMessage = false;
    }, 2000);
  }

  pickCard() {
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;

    if (this.game.stack.length === 0) {
      this.overgameAnimation = true;
    }

    this.updateCurrentPlayer();

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }

  updateCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name && result.image) {
        if (this.game.players.length < 6) {
          this.game.players.push(result.name);
          this.game.playerImages.push(result.image);
        } else {
          this.showPlayerLimitMessage = true;
          setTimeout(() => {
            this.showPlayerLimitMessage = false;
          }, 2000);
        }
      }
    }); 

  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.componentInstance.initializePlayer(
      this.game.players[playerId],
      this.game.playerImages[playerId]
    );

    dialogRef.afterClosed().subscribe((result: { name: string; img: string } | 'DELETE') => {

      if (result == 'DELETE') {
        this.game.players.splice(playerId, 1);
        this.game.playerImages.splice(playerId, 1);
      } else {
        this.game.players[playerId] = result.name;
        this.game.playerImages[playerId] = result.img;
      }

    });
  }

  restart() {
    this.newGame();
    this.overgameAnimation = false;
    this.pickCardAnimation = false;
    this.warningMessage = false;
    this.showPlayerLimitMessage = false;
    this.currentCard = '';
  }
}


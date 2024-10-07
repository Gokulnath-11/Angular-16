import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule],  
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.css']
})
export class PersonProfileComponent {
  constructor(
    public dialogRef: MatDialogRef<PersonProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public person: any,
    private _snackBar: MatSnackBar
  ) { }

  onInterested(): void {
    this.openSnackBar("I am interested!");
    setTimeout(() => {
      this.dialogRef.close({ interested: true });
    }, 1000);
  }

  onNotInterested(): void {
    this.openSnackBar("I am not interested!");
    setTimeout(() => {
      this.dialogRef.close({ interested: false });
    }, 1000);
  }

  onShortlist(): void {
    this.person.shortlisted = !this.person.shortlisted;
    let message = this.person.shortlisted ? 'Shortlisted!' : 'Not shortlisted!';
    this.openSnackBar(message);
  }

  onSwipeRight(): void {
    this.onInterested();
  }

  onSwipeLeft(): void {
    this.onNotInterested();
  }

  openSnackBar(message : string) {
    this._snackBar.open(`${message}`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

}

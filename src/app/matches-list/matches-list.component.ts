import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ApiService } from '../services/api.service';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Person } from '../models/person';

@Component({
  selector: 'app-matches-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css'],
})
export class MatchesListComponent implements OnInit {
  people: Person[] = [];
  currentPersonId = 0;

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getPeople().subscribe(data => {
      this.people = data.people;
    });
  }

  no(id:number){
    this.people = this.people.filter(person => person.id !== id);
  }


  openPersonDialog(person : any): void {
    this.currentPersonId = person.id;
    import('../person-profile/person-profile.component').then(({ PersonProfileComponent }) => {
      const dialogRef = this.dialog.open(PersonProfileComponent, {
        width: '400px',
        data: person
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.handleInterest(result.interested);
        }
      });
    });
  }

  handleInterest(interested: boolean): void {
    if (interested) {
      console.log('User is interested');
      for(let i = 0; i < this.people.length; i++){
        if(this.people[i].id === this.currentPersonId){
          this.people[i].interested = true;
        }
      }
      console.log("this.people ", this.people);
    } else {
      console.log('User is not interested');
    }
    this.people = this.people.filter(person => (person.id !== this.currentPersonId && person.interested === false));
    console.log("this.people +", this.people);
    this.showNextProfile(this.people[0]);
  }

  showNextProfile(person : Person): void {
    this.currentPersonId = person?.id;
    if(this.currentPersonId) this.openPersonDialog(person);
  }

}

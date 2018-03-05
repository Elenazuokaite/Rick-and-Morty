import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  characters: any;
  next: string;
  prev: string;
  genders: any[];
  status: any[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.genders = ['female', 'male', 'genderless', 'unknown'];
    this.status = ['alive', 'dead', 'unknown'];
    this.http.get('https://rickandmortyapi.com/api/character').subscribe(characters => {
      this.characters = characters;
      this.next = this.characters.info.next;
      this.prev = this.characters.info.prev;
      this.characters = this.characters.results;
    });
  }
  onSearchChange(searchValue) {
    if (searchValue.length >= 3) {
      this.http.get('https://rickandmortyapi.com/api/character/?name=' + searchValue).subscribe(characters => {
        this.characters = characters;
        this.characters = this.characters.results;
        this.next = this.characters.info.next;
        this.prev = this.characters.info.prev;
      });
    }
  }
  ngDoCheck() {
    const prevBtns = document.querySelectorAll('.prev');
    const nextBtns = document.querySelectorAll('.next');
    if (this.prev === '') {
      for (let i = 0; i < prevBtns.length; i++) {
        prevBtns[i].setAttribute('disabled', '');
      }
    } else {
      for (let i = 0; i < prevBtns.length; i++) {
        prevBtns[i].removeAttribute('disabled');
      }
    }
    if (this.next === '') {
      for (let i = 0; i < nextBtns.length; i++) {
        nextBtns[i].setAttribute('disabled', '');
      }
    } else {
      for (let i = 0; i < nextBtns.length; i++) {
        nextBtns[i].removeAttribute('disabled');
      }
    }
  }
  nextPage() {
    this.http.get('' + this.next).subscribe(characters => {
      this.characters = characters;
      this.next = this.characters.info.next;
      this.prev = this.characters.info.prev;
      this.characters = this.characters.results;
    });
  }
  prevPage() {
    this.http.get('' + this.prev).subscribe(characters => {
      this.characters = characters;
      this.next = this.characters.info.next;
      this.prev = this.characters.info.prev;
      this.characters = this.characters.results;
    });
  }
  filterByGender(gender) {
    this.http.get('https://rickandmortyapi.com/api/character/?gender=' + gender).subscribe(characters => {
      this.characters = characters;
      this.next = this.characters.info.next;
      this.prev = this.characters.info.prev;
      this.characters = this.characters.results;
    });
  }
  filterByStatus(status) {
    this.http.get('https://rickandmortyapi.com/api/character/?status=' + status).subscribe(characters => {
      this.characters = characters;
      this.next = this.characters.info.next;
      this.prev = this.characters.info.prev;
      this.characters = this.characters.results;
    });
  }

}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  countries = [
    {value: 'fr', label: 'France'},
    {value: 'us', label: 'USA'},
  ];

  currentCountry = 'fr';
  selectedIndex = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}

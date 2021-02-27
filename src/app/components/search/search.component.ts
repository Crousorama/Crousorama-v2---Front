import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  chips = [
    {
      selected: true,
      label: 'Palmarès'
    },
    {
      selected: false,
      label: 'Palmarès Dividendes'
    },
  ];

  selectedIndex = 0;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  chipSelectedChanged(idx): void {
    this.selectedIndex = idx;
    this.chips.forEach((value, index) => {
      if (index === idx) {
        return;
      }
      value.selected = false;
    });
  }

}

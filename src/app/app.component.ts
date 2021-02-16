import { Component } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MenuComponent} from './bottomsheets/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private bottomsheet: MatBottomSheet) {
  }

  openMenu(): void {
    this.bottomsheet.open(MenuComponent, {
      panelClass: ['no-padding', 'menu-bottomsheet']
    });
  }

}

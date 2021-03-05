import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MenuComponent} from './bottomsheets/menu/menu.component';
import {PwaUpdatesService} from './services/pwa-updates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private bottomsheet: MatBottomSheet,
              private pwaUpdateService: PwaUpdatesService) {
  }

  openMenu(): void {
    this.bottomsheet.open(MenuComponent, {
      panelClass: ['no-padding', 'menu-bottomsheet']
    });
  }

  ngOnInit(): void {
    this.pwaUpdateService.checkForUpdates();
  }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserStock} from '../../models/user-stocks';
import {UserStockService} from '../../services/user-stock.service';

@Component({
  selector: 'app-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.scss']
})
export class DrawerContainerComponent implements OnInit {

  routes = [
    {
      label: 'Mon portefolio',
      path: '',
      icon: 'home'
    },
    {
      label: 'Rechercher',
      path: 'search',
      icon: 'search'
    },
    {
      label: 'Actualités',
      path: 'news',
      icon: 'feed'
    }
  ];

  constructor(private router: Router,
              private userStockService: UserStockService) {
  }

  ngOnInit(): void {
  }

  moveTo(url): Promise<any> {
    return this.router.navigate([url]);
  }

  get userStocks(): UserStock[] {
    return this.userStockService.userStocks ? this.userStockService.userStocks.stocks : [];
  }

  getCompanyName(stockName: string): string {
    return stockName.split(' ')[0].toLowerCase();
  }

  moveToStockInfo(symbol): void {
    this.router.navigate(['stock/' + symbol]);
  }

  isCurrentUrl(path: string): boolean {
    return window.location.hash.replace('#/', '') === path;
  }

}

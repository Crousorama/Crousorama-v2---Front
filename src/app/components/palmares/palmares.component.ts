import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {Palmares} from '../../models/palmares';
import {Router} from '@angular/router';

@Component({
  selector: 'app-palmares',
  templateUrl: './palmares.component.html',
  styleUrls: ['./palmares.component.scss']
})
export class PalmaresComponent implements OnInit {

  loading = true;
  palmares: Palmares[] = [];

  constructor(
    private stocksService: StocksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stocksService.getPalmares().subscribe((palmares: Palmares[]) => {
      this.palmares = palmares;
      this.loading = false;
    });
  }

  getClass(variation: string): string {
    return variation.includes('+') ? 'green' : variation.includes('-') ? 'red' : '';
  }

  moveToStockInfo(palmares: Palmares): void {
    const symbol = palmares.meta.split(' /')[0] + '.PA';
    this.router.navigate(['stock/' + symbol]);
  }

}

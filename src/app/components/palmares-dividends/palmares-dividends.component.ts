import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-palmares-dividends',
  templateUrl: './palmares-dividends.component.html',
  styleUrls: ['./palmares-dividends.component.scss']
})
export class PalmaresDividendsComponent implements OnInit {

  loading = true;
  palmaresDividendes = [];
  currentSort = 'rend';

  constructor(
    private stocksService: StocksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stocksService.getPalmaresDividendes().subscribe((res) => {
      this.loading = false;
      this.palmaresDividendes = res.filter(r => {
        return Object.keys(r).indexOf('Var.') > -1;
      });
      this.palmaresDividendes.sort(this.sortPalmares);
    });
  }

  sortPalmares = (pA, pB) => {
    const currentYear = new Date().getFullYear();
    if (this.currentSort === 'rend') {
      return parseFloat(pB['Rend. ' + currentYear]) - parseFloat(pA['Rend. ' + currentYear]);
    } else {
      return parseFloat(pB['Div. ' + currentYear]) - parseFloat(pA['Div. ' + currentYear]);
    }
  }

  sortChanged(): void {
    this.palmaresDividendes.sort(this.sortPalmares);
  }

  getClass(obj): string {
    return obj['Var.'].includes('+') ? 'green' : obj['Var.'].includes('-') ? 'red' : '';
  }

  moveToStockInfo(symbol): void {
    this.router.navigate(['stock/' + symbol + '.PA']);
  }

  getYears(p): string[] {
    return Object.keys(p).filter(k => k.includes('Div.')).map(k => k.split(' ')[1]);
  }

}

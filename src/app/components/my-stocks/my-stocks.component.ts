import {Component, OnInit} from '@angular/core';
import {UserStockService} from '../../services/user-stock.service';
import {StocksService} from '../../services/stocks.service';
import {UserStock, UserStocks} from '../../models/user-stocks';
import {Stock} from '../../models/stock';

@Component({
  selector: 'app-my-stocks',
  templateUrl: './my-stocks.component.html',
  styleUrls: ['./my-stocks.component.scss']
})
export class MyStocksComponent implements OnInit {

  constructor(
    private userStocksService: UserStockService,
    private stocksService: StocksService
  ) {
  }

  totalAmount = 0;
  userStocks: UserStock[] = [];
  stocks: Stock[] = [];
  loading = true;

  ngOnInit(): void {
    this.userStocksService.getUserStocks().subscribe((userStock: UserStocks) => {
      this.userStocks = [
        ...userStock.pea,
        ...userStock.titres
      ];

      const qTab = [];
      let amount = 0;

      this.userStocks.forEach(s => {
        qTab.push(new Promise(resolve => {
          this.stocksService.getStock(s.symbol).subscribe((stock: Stock) => {
            this.stocks.push(stock);
            amount += stock.price * s.qty;
            resolve(null);
          });
        }));
      });

      Promise.all(qTab).then(() => {
        this.loading = false;
        this.animateValue(0, amount, 2000);
        setTimeout(() => {
          this.totalAmount = amount;
        }, 2500);
      });

    });
  }

  animateValue(start, end, duration): void {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) { startTimestamp = timestamp; }
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      this.totalAmount = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  croppedName(fullName: string): string {
    return fullName.length > 9 ? fullName.substring(0, 6) + '...' : fullName;
  }

  getCurrentValue(symbol: string, quantity: number): number {
    const stock = this.stocks.find(s => s.symbol === symbol);
    if (stock) {
      return stock.price * quantity;
    }
    return 0;
  }

  getPercentage(userStock: UserStock): number {
    const stock = this.stocks.find(s => userStock.symbol === s.symbol);
    if (stock) {
      const percentage = (stock.price - userStock.bought_value) / userStock.bought_value;
      return percentage * 100;
    }
    return 0;
  }

//  (10 - 8.9) / 10
// 0.10999999999999996
// (10 - 8.9)/8.9
// 0.12359550561797748
// (10 - 11.4) / 11.4
// -0.12280701754385967
}

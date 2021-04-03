import {Component, OnInit} from '@angular/core';
import {UserStockService} from '../../services/user-stock.service';
import {StocksService} from '../../services/stocks.service';
import {UserStock, UserStocks} from '../../models/user-stocks';
import {Stock} from '../../models/stock';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-stocks',
  templateUrl: './my-stocks.component.html',
  styleUrls: ['./my-stocks.component.scss']
})
export class MyStocksComponent implements OnInit {

  constructor(
    private userStocksService: UserStockService,
    private stocksService: StocksService,
    private router: Router
  ) {
  }

  totalAmount = 0;
  stocks: Stock[] = [];
  loading = true;

  async ngOnInit(): Promise<void> {

    if (!this.userStocks) {
      await this.userStocksService.loadUserStocks();
      console.log(this.userStocksService.userStocks);
    }

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
      this.totalAmount = amount;
    });
  }

  get userStocks(): UserStock[] {
    return this.userStocksService.userStocks ?
      this.userStocksService.userStocks.stocks : null;
  }

  animateValue(start, end, duration): void {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }
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

  moveToStockInfo(symbol): void {
    this.router.navigate(['stock/' + symbol]);
  }

  getValueDelta(us: UserStock): string {
    const delta = this.getDelta(us);
    return delta > 0 ? `(+${(delta * us.qty).toFixed(3)})` : `(-${(delta * us.qty).toFixed(3)})`;
  }

  getDelta(us): number {
    const stock = this.stocks.find(s => s.symbol === us.symbol);
    if (!stock) {
      return null;
    }
    return Math.round((stock.price - us.bought_value) * 100) / 100;
  }

  get totalPlusMoinsValue(): number {
    if (!this.userStocks) {
      return 0;
    }
    let total = 0;
    this.userStocks.forEach(us => {
      total += this.getDelta(us) * us.qty;
    });
    return total;
  }
}

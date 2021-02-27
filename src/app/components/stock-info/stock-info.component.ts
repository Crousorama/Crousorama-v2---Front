import {Component, Input, OnInit} from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {Stock} from '../../models/stock';
import {ActivatedRoute} from '@angular/router';
import {ChartOptions} from 'chart.js';
import {News} from '../../models/news';
import {NewsService} from '../../services/news.service';
import {UserStockService} from '../../services/user-stock.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {HandleFavoriteComponent} from '../../bottomsheets/handle-favorite/handle-favorite.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss']
})
export class StockInfoComponent implements OnInit {

  loading = true;
  newsLoading = true;

  currentRange = '1d';

  knownRanges = [
    '1d',
    '5d',
    '1mo',
    '6mo',
    'ytd',
    '1y',
    '5y',
    'max',
  ];
  news: News[] = [];
  datasets = [];
  labels = [];
  options: ChartOptions = {
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    },
    legend: {
      display: false,
    },
  };

  @Input() stockSymbol = null;
  stockData: Stock = null;

  constructor(
    private stocksService: StocksService,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private userStockService: UserStockService,
    private bottomSheet: MatBottomSheet,
    private snackbar: MatSnackBar
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.userStockService.userStocks) {
      await this.userStockService.loadUserStocks();
    }
    if (this.stockSymbol) {
      this.stockData = await this.stocksService.getStock(this.stockSymbol).toPromise();
      this.filterRanges();
      this.drawChart();
      this.loading = false;
      this.loadNews();
    } else {
      this.route.params.subscribe(params => {
        this.stocksService.getStock(params.symbol).subscribe((stockData: Stock) => {
          this.stockData = stockData;
          this.filterRanges();
          this.drawChart();
          this.loading = false;
          this.loadNews();
        });
      });
    }
  }

  filterRanges(): void {
    this.stockData.validRanges = this.stockData.validRanges.filter(r => this.knownRanges.indexOf(r) > -1);
  }

  getPercentage(): number {
    const tmp = this.stockData.price / this.stockData.previous_close;
    return tmp < 1 ? (1 - tmp) * -100 : (tmp - 1) * 100;
  }

  drawChart(): void {
    const data = this.stockData.prices.close;
    this.options.scales.xAxes[0] = {
      ticks: {
        display: false,
        autoSkip: true,
      }
    };
    this.datasets = [
      {
        type: 'line',
        lineTension: 0,
        pointRadius: 3,
        data,
        spanGaps: true
      }
    ];
    this.labels = this.stockData.timestamps.map(t => {
      const date = new Date(t * 1000);
      return date.toLocaleString();
    });
  }

  async rangeChanged(): Promise<any> {
    this.loading = true;
    const stock = await this.stocksService.getStock(this.stockData.symbol, this.currentRange).toPromise();
    this.stockData.timestamps = stock.timestamps;
    this.stockData.prices = stock.prices;
    this.filterRanges();
    this.drawChart();
    this.loading = false;
  }

  loadNews(): void {
    this.newsService.getNewsForCompany(this.stockData.full_name).subscribe((news: News[]) => {
      this.news = news;
      this.newsLoading = false;
    });
  }

  redirectToNews(news: News): void {
    window.open(news.link, '_blank');
  }

  getDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }

  get isInUserStock(): boolean {
    return this.userStockService.userStocks ?
      this.userStockService.userStocks.stocks.map(s => s.symbol).indexOf(this.stockData.symbol) > -1 :
      false;
  }

  handleFavorite(): void {
    this.bottomSheet.open(HandleFavoriteComponent, {
      data: this.stockData
    }).afterDismissed().subscribe(action => {
      if (action) {
        this.snackbar.open(`Action ${action} !`, 'Fermer', {duration: 2000});
      }
    });
  }

}

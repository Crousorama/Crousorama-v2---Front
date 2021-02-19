import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {StockSearchResult} from '../../models/stock-search-result';
import {FormBuilder} from '@angular/forms';
import {StocksService} from '../../services/stocks.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchForm = this.fb.group({
    search: [null]
  });

  searching = false;

  $subscription: Subscription = null;
  searchResults: StockSearchResult[] = [];

  constructor(
    private fb: FormBuilder,
    private stocksService: StocksService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.searchForm.controls.search.valueChanges.subscribe((q: string) => {
      if (q.length === 0) {
        this.searchResults = [];
        return;
      }
      this.searching = true;
      if (this.$subscription) {
        this.$subscription.unsubscribe();
      }
      this.$subscription = this.stocksService.searchStock(q).subscribe((res: StockSearchResult[]) => {
        this.searchResults = res;
        this.$subscription = null;
        this.searching = false;
      });
    });
  }

  moveToStock(symbol: string): any {
    return this.router.navigate([`/stock/${symbol}`]);
  }

}

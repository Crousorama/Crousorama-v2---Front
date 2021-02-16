import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {UserStockService} from '../../services/user-stock.service';
import {UserStock, UserStocks} from '../../models/user-stocks';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public bottomSheetRef: MatBottomSheetRef<MenuComponent>,
              private userStockService: UserStockService) {
  }

  userStocks: UserStock[] = [];
  stocksLoading = true;

  ngOnInit(): void {
    this.userStockService.getUserStocks().subscribe((stocks: UserStocks) => {
      console.log('stocks', stocks);
      this.stocksLoading = false;
      this.userStocks = [
        ...stocks.pea,
        ...stocks.titres,
      ];
    });
  }

  getCompanyName(stockName: string): string {
    return stockName.split(' ')[0].toLowerCase();
  }

}

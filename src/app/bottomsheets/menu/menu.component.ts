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

  stocksLoading = true;

  async ngOnInit(): Promise<void> {
    if (!this.userStocks) {
      await this.userStockService.loadUserStocks();
    }
    this.stocksLoading = false;
  }

  get userStocks(): UserStock[] {
    return this.userStockService.userStocks ? this.userStockService.userStocks.stocks : [];
  }

  getCompanyName(stockName: string): string {
    return stockName.split(' ')[0].toLowerCase();
  }

}

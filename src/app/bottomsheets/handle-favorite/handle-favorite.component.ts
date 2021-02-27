import {Component, Inject, OnInit} from '@angular/core';
import {UserStockService} from '../../services/user-stock.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Stock} from '../../models/stock';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

enum ACTION {
  ADDED = 'ajoutée',
  DELETED = 'supprimée'
}

@Component({
  selector: 'app-handle-favorite',
  templateUrl: './handle-favorite.component.html',
  styleUrls: ['./handle-favorite.component.scss']
})
export class HandleFavoriteComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private userStocksService: UserStockService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Stock,
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<HandleFavoriteComponent>
  ) { }

  ngOnInit(): void {
    if (!this.isInUserStocks) {
      this.form = this.fb.group({
        bought_value: [this.data.price, [Validators.required]],
        fullName: [this.data.full_name],
        qty: [1, Validators.required],
        symbol: [this.data.symbol]
      });
    }
  }

  get isInUserStocks(): boolean {
    return this.userStocksService.userStocks.stocks.map(s => s.symbol).indexOf(this.data.symbol) > -1;
  }

  get qty(): number {
    return this.form ? this.form.controls.qty.value : 0;
  }

  confirm(): void {
    this.loading = true;
    if (!this.isInUserStocks) {
      const payload = this.form.getRawValue();
      this.userStocksService.userStocks.stocks.push(payload);
      this.userStocksService.updateUserStocks(this.userStocksService.userStocks).subscribe(() => {
        this.bottomSheetRef.dismiss(ACTION.ADDED);
        this.loading = false;
      });
    } else {
      const idx = this.userStocksService.userStocks.stocks.map(s => s.symbol).indexOf(this.data.symbol);
      if (idx > -1) {
        this.userStocksService.userStocks.stocks.splice(idx, 1);
        this.userStocksService.updateUserStocks(this.userStocksService.userStocks).subscribe(() => {
          this.bottomSheetRef.dismiss(ACTION.DELETED);
          this.loading = false;
        });
      }
    }
  }

}

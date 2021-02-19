import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyStocksComponent} from './components/my-stocks/my-stocks.component';
import {SearchComponent} from './components/search/search.component';
import {StockInfoComponent} from './components/stock-info/stock-info.component';

const routes: Routes = [
  {path: 'my-stocks', component: MyStocksComponent},
  {path: 'search', component: SearchComponent},
  {path: 'stock/:symbol', component: StockInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

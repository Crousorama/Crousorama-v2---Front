import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stock} from '../models/stock';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(
    private http: HttpClient
  ) {
  }

  getStock(symbol: string, range = '1d'): Observable<Stock> {
    return this.http.get(`/stocks/${symbol}?date_range=${range}`).pipe(map((stock: Stock) => stock));
  }

  searchStock(q: string): Observable<any> {
    return this.http.get(`/stocks?q=${q}`);
  }

  getPalmares(): Observable<any> {
    return this.http.get(`/stocks/palmares`);
  }

  getPalmaresDividendes(): Observable<any> {
    return this.http.get(`/stocks/palmares_dividends`);
  }

}

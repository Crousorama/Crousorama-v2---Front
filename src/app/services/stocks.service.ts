import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(
    private http: HttpClient
  ) { }

  getStock(symbol: string): Observable<any> {
    return this.http.get(`/stocks/${symbol}`);
  }
}

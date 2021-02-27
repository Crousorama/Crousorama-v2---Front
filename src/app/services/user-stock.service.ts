import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStock, UserStocks} from '../models/user-stocks';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserStockService {

  userStocks: UserStock[] = null;

  constructor(
    private http: HttpClient
  ) {
  }

  loadUserStocks(): Promise<void> {
    return this.http.get('/user_stocks').pipe(map((userStocks: UserStocks) => {
      this.userStocks = [
        ...userStocks.titres,
        ...userStocks.pea,
      ];
      return;
    })).toPromise();
  }

  getUserStocks(): Observable<any> {
    return this.http.get('/user_stocks');
  }

}

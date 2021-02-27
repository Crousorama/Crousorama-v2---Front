import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStock, UserStocks} from '../models/user-stocks';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserStockService {

  userStocks: UserStocks = null;

  constructor(
    private http: HttpClient
  ) {
  }

  loadUserStocks(): Promise<void> {
    return this.http.get('/user_stocks').pipe(map((userStocks: UserStocks) => {
      this.userStocks = userStocks;
      return;
    })).toPromise();
  }

  updateUserStocks(userStocks: UserStocks): Observable<any> {
    return this.http.patch('/user_stocks', userStocks).pipe(map((newUserStocks: UserStocks) => {
      this.userStocks = newUserStocks;
      return newUserStocks;
    }));
  }

}

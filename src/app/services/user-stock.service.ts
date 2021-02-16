import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStockService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUserStocks(): Observable<any> {
    return this.http.get('/user_stocks');
  }

}

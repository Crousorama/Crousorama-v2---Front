import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNewsForCompany(companyName): Observable<any> {
    return this.http.get(`/news/stock/${companyName}`);
  }

  getNewsForCountry(countryCode): Observable<any> {
    return this.http.get(`/news?country=${countryCode}`);
  }
}

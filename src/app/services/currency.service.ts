import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseUrl = 'http://localhost:8080/currencies';

  constructor(
    private http: HttpClient
  ) {}

  getCurrencyById(currencyId) {
    return this.http.get(`${this.baseUrl}/${currencyId}`)
      .pipe(
      map((res: any) => {
        return res;
      }));
  }

  getCurrencyList() {
    return this.http.get(`${this.baseUrl}`)
      .pipe(
      map((res: any) => {
        return res;
      }));
  }

  deleteCurrency(currencyId) {
    return this.http.delete(`${this.baseUrl}/${Number(currencyId)}`, {headers: this.headers})
      .pipe(
      map((res: any) => {
        return res;
      }));
  }

  createCurrency(currency: any) {
    return this.http.post(`${this.baseUrl}`, currency, {headers: this.headers})
      .pipe(
      map((res: any) => {
        return res;
      }));
  }

  updateCurrency(currency: any) {
    return this.http.put(`${this.baseUrl}`, currency, {headers: this.headers})
      .pipe(
      map((res: any) => {
        return res;
      }));
  }

}

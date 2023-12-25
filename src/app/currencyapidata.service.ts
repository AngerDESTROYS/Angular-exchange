import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyapidataService {

  private corsProxyUrl = 'https://thingproxy.freeboard.io/fetch/';
  private apiUrl = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=';

  constructor(private http: HttpClient) { }

  getCurrencyData() {
    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    const fullUrl = this.corsProxyUrl + this.apiUrl + formattedDate;

    return this.http.get(fullUrl);
  }
}

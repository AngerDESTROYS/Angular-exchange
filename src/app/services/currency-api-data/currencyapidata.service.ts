import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CurrencyData2 } from 'src/app/models/interfeces';

@Injectable({
  providedIn: 'root'
})
export class CurrencyapidataService {

  private apiUrl = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=';
  private corsProxyUrl = 'https://api.allorigins.win/raw?url=';

  constructor(private http: HttpClient) {}

  getCurrencyData() {
    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    const fullUrl = this.corsProxyUrl + encodeURIComponent(this.apiUrl + formattedDate);

    return this.http.get<CurrencyData2>(fullUrl);
  }
}

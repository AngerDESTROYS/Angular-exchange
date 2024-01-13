import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyData2 } from 'src/app/models/interfeces';

@Injectable({
  providedIn: 'root',
})
export class CurrencyapidataService {
  private apiUrl = 'https://api.privatbank.ua/p24api/exchange_rates?date=';
  private corsProxyUrl = 'https://api.allorigins.win/raw?url=';

  constructor(private http: HttpClient) {}

  getCurrencyData() {
    const today = new Date();
    const currentHour = today.getHours();
    let day = ('0' + today.getDate()).slice(-2);
    if (currentHour < 8) {
      day = (Number(day) - 1).toString();
    }
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    const fullUrl = this.corsProxyUrl + this.apiUrl + formattedDate;

    return this.http.get<CurrencyData2>(fullUrl);
  }
}

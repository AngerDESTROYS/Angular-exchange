import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CurrencyapidataService {

  private apiUrl = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=';
  private proxyUrl = 'http://cors-anywhere.herokuapp.com/'

  constructor(private http: HttpClient) { }

  getCurrencyData() {
    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    const fullUrl = this.proxyUrl + this.apiUrl + formattedDate;

    return this.http.get(fullUrl);
  }
}

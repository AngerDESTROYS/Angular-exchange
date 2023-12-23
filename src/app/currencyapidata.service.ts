import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CurrencyapidataService {

  constructor(private http:HttpClient) { }

  getcurrencydata() {
    let url = 'https://api.monobank.ua/bank/currency';
    return this.http.get(url);
  }
}

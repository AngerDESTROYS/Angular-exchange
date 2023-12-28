import { Component, OnInit } from '@angular/core';
import { CurrencyapidataService } from './services/currency-api-data/currencyapidata.service';
import { Currencies, CurrencyData, CurrencyData2 } from './models/interfeces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-exchange';
  currjson: CurrencyData2 = { bank: '', baseCurrency: 0, baseCurrencyLit: '', date: '', exchangeRate: [] };
  showLoadingMessage = false;

  currencies: Currencies = {
    uah: { buys: 1, sells: 1 },
    eur: { buys: 1, sells: 1 },
    usd: { buys: 1, sells: 1 },
    pln: { buys: 1, sells: 1 },
    gbp: { buys: 1, sells: 1 },
    czk: { buys: 1, sells: 1 },
    chf: { buys: 1, sells: 1 },
  };

  selectedValues = { c1: 1, c2: 1 };
  inputValues = { c1: 0, c2: 0 };
  secondCombinationValue = 1;

  constructor(private currency: CurrencyapidataService) { }

  ngOnInit() {
    setTimeout(() => (this.showLoadingMessage = true), 3000);
    this.fetchCurrencyData();
  }

  private filterCurrencyByCode(currencyCode: string): CurrencyData | undefined {
    return this.currjson.exchangeRate.find((item: CurrencyData) => item.currency === currencyCode);
  }

  private fetchCurrencyData() {
    this.currency.getCurrencyData().subscribe((data: CurrencyData2) => {
      this.currjson = data;
      Object.keys(this.currencies).map(currency => {
        const currencyCode = currency.toUpperCase();
        const filteredCurrency = this.filterCurrencyByCode(currencyCode);
        if (filteredCurrency) {
          this.currencies[currency].buys = filteredCurrency.purchaseRate ?? 1;
          this.currencies[currency].sells = filteredCurrency.saleRate ?? 1;
        }
      });

      this.showLoadingMessage = false;
    });
  }
}

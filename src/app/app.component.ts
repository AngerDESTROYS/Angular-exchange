import { Component, OnInit } from '@angular/core';
import { CurrencyapidataService } from './currencyapidata.service';

interface CurrencyData {
  baseCurrency: string;
  currency: string;
  purchaseRate: number;
  purchaseRateNB: number;
  saleRate: number;
  saleRateNB: number;
}

interface CurrencyData2 {
  bank: string
  baseCurrency: number;
  baseCurrencyLit: string;
  date: string;
  exchangeRate: CurrencyData[];
}

interface CurrencyObject {
  buys: number;
  sells: number;
}

interface Currencies {
  [currency: string]: CurrencyObject;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-exchange';
  currjson: any = [];
  showLoadingMessage = false;

  currencies: Currencies = {
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
    this.showLoadingMessage = false;
    setTimeout(() => (this.showLoadingMessage = true), 3000);
    this.fetchCurrencyData();
  }

  private filterCurrencyByCode(currencyCode: string, data: CurrencyData2): any {
    return data.exchangeRate.find((item: CurrencyData) => item.currency === currencyCode);
  }

  private fetchCurrencyData() {
    this.currency.getCurrencyData().subscribe((data) => {
      console.log(data);
      this.currjson = data;
      for (const currency of Object.keys(this.currencies)) {
        const currencyCode = currency.toUpperCase();
        const filteredCurrency = this.filterCurrencyByCode(currencyCode, this.currjson);
        if (filteredCurrency) {
          this.currencies[currency].buys = filteredCurrency.purchaseRate;
          this.currencies[currency].sells = filteredCurrency.saleRate;
        }
      }

      console.log('currjson:', this.currjson);
      console.log(this.currencies);

      this.selectedValues.c1 = 1;
      this.selectedValues.c2 = this.currencies['usd'].sells;
      this.updateSecondCombinationValue();
    });
  }

  convertFirstToSecond() {
    const selectedValueC1 = Number(this.selectedValues.c1);
    const selectedValueC2 = Number(this.selectedValues.c2);
    const inputValueC1 = Number(this.inputValues.c1);

    if (!isNaN(inputValueC1) && !isNaN(selectedValueC1) && !isNaN(selectedValueC2)) {
      this.inputValues.c2 = +(inputValueC1 * selectedValueC1 / selectedValueC2).toFixed(2);
    }
  }

  convertSecondToFirst() {
    const selectedValueC1 = Number(this.selectedValues.c1);
    const selectedValueC2 = Number(this.selectedValues.c2);
    const inputValueC2 = Number(this.inputValues.c2);

    if (!isNaN(inputValueC2) && !isNaN(selectedValueC1) && !isNaN(selectedValueC2)) {
      this.inputValues.c1 = +(inputValueC2 * selectedValueC2 / selectedValueC1).toFixed(2);
    }
  }

  switchAndRecountInputs() {
    const mapping = {
      [this.currencies['usd'].buys]: this.currencies['usd'].sells,
      [this.currencies['eur'].buys]: this.currencies['eur'].sells,
      [this.currencies['gbp'].buys]: this.currencies['gbp'].sells,
      [this.currencies['pln'].buys]: this.currencies['pln'].sells,
      [this.currencies['czk'].buys]: this.currencies['czk'].sells,
      [this.currencies['chf'].buys]: this.currencies['chf'].sells,
      1: 1,
    };

    const mapping2 = {
      [this.currencies['usd'].sells]: this.currencies['usd'].buys,
      [this.currencies['eur'].sells]: this.currencies['eur'].buys,
      [this.currencies['gbp'].sells]: this.currencies['gbp'].buys,
      [this.currencies['pln'].sells]: this.currencies['pln'].buys,
      [this.currencies['czk'].sells]: this.currencies['czk'].buys,
      [this.currencies['chf'].sells]: this.currencies['chf'].buys,
      1: 1
    };
    console.log(this.selectedValues.c1, this.selectedValues.c2)
    const temp = this.selectedValues.c1;
    this.selectedValues.c1 = mapping2[this.selectedValues.c2];
    this.selectedValues.c2 = mapping[temp];

    [this.inputValues.c1, this.inputValues.c2] = [this.inputValues.c2, this.inputValues.c1];

    this.convertFirstToSecond();
    this.updateSecondCombinationValue();
  }

  updateSecondCombinationValue() {
    this.secondCombinationValue = this.selectedValues.c2 === 1 ? this.selectedValues.c1 : this.selectedValues.c2;
  }
}

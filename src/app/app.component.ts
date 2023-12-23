import { Component, OnInit } from '@angular/core';
import { CurrencyapidataService } from './currencyapidata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-exchange';
  currjson: any = [];
  showLoadingMessage = false;

  eurbuys = 1;
  eursells = 1;
  usdbuys = 1;
  usdsells = 1;

  selectedValues = {
    c1: 1,
    c2: 1,
  };

  inputValues = {
    c1: 0,
    c2: 0,
  };

  constructor(private currency: CurrencyapidataService) { }

  ngOnInit() {
    this.showLoadingMessage = false;

    setTimeout(() => {
      this.showLoadingMessage = true;
    }, 3000);

    this.fetchCurrencyData();
  }

  private fetchCurrencyData() {
    this.currency.getcurrencydata().subscribe(data => {
      this.currjson = JSON.stringify(data);
      this.currjson = JSON.parse(this.currjson);
      this.eurbuys = this.currjson.slice(1, 2)[0].rateBuy;
      this.eursells = this.currjson.slice(1, 2)[0].rateSell;
      this.usdbuys = this.currjson.slice(0, 1)[0].rateBuy;
      this.usdsells = this.currjson.slice(0, 1)[0].rateSell;

      this.selectedValues.c1 = this.usdbuys;
      this.selectedValues.c2 = this.eursells;
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
    const temp = this.selectedValues.c1;
    if (this.selectedValues.c2 === this.usdsells) {
      this.selectedValues.c1 = this.usdbuys;
    } if (this.selectedValues.c2 === this.eursells) {
      this.selectedValues.c1 = this.eurbuys;
    } else if (this.selectedValues.c2 === 1) {
      this.selectedValues.c1 = 1;
    }
    if (temp === this.usdbuys) {
      this.selectedValues.c2 = this.usdsells;
    } if (temp === this.eurbuys) {
      this.selectedValues.c2 = this.eursells;
    } else if (temp === 1) {
      this.selectedValues.c2 = 1;
    }

    const tempInput = this.inputValues.c1;
    this.inputValues.c1 = this.inputValues.c2;
    this.inputValues.c2 = tempInput;

    this.convertFirstToSecond();
  }
}

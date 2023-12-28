import { Component, Input, OnInit } from '@angular/core';
import { Currencies, CurrencyObject } from 'src/app/models/interfeces';


@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  @Input() currencies: Currencies = {};

  selectedValues = { c1: 1, c2: 1 };
  inputValues = { c1: 0, c2: 0 };
  secondCombinationValue = 1;

  ngOnInit() {
    this.selectedValues.c1 = 1;
    this.selectedValues.c2 = this.currencies['usd'].sells;
    this.updateSecondCombinationValue();
  }

  convertCurrency(from: 'c1' | 'c2', to: 'c1' | 'c2') {
    const selectedValueFrom = +this.selectedValues[from];
    const selectedValueTo = +this.selectedValues[to];
    const inputValue = +this.inputValues[from];

    if (!isNaN(inputValue) && !isNaN(selectedValueFrom) && !isNaN(selectedValueTo)) {
      this.inputValues[to] = +(inputValue * selectedValueFrom / selectedValueTo).toFixed(2);
    }
  }

  switchAndRecountInputs() {
    const tempBuys = this.selectedValues.c1;
    const tempSells = this.selectedValues.c2;
    const currenciesArray: CurrencyObject[] = Object.values(this.currencies);
    const foundBuy = currenciesArray.find(currency => currency.buys === tempBuys);
    const foundSell = currenciesArray.find(currency => currency.sells === tempSells);

    this.selectedValues.c2 = foundBuy ? foundBuy.sells : 1;
    this.selectedValues.c1 = foundSell ? foundSell.buys : 1;

    [this.inputValues.c1, this.inputValues.c2] = [this.inputValues.c2, this.inputValues.c1];

    this.convertCurrency('c1', 'c2');
    this.updateSecondCombinationValue();
  }

  updateSecondCombinationValue() {
    this.secondCombinationValue = this.selectedValues.c2 === 1 ? this.selectedValues.c1 : this.selectedValues.c2;
  }
}

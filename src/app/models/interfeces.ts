export interface CurrencyData {
  baseCurrency: string;
  currency: string;
  saleRateNB: number;
  purchaseRateNB: number;
  saleRate?: number;
  purchaseRate?: number;
}

export interface CurrencyData2 {
  bank: string
  baseCurrency: number;
  baseCurrencyLit: string;
  date: string;
  exchangeRate: CurrencyData[];
}

export interface CurrencyObject {
  buys: number;
  sells: number;
}

export interface Currencies {
  [currency: string]: CurrencyObject;
}

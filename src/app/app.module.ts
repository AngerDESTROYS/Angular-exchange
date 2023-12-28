import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { LoadingTemplateComponent } from './components/loading-template/loading-template.component';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRatesComponent,
    CurrencyConverterComponent,
    LoadingTemplateComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

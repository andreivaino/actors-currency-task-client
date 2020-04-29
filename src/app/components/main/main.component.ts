import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../../services/currency.service';
import {finalize} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {ComponentObserverService} from '../../services/component-observer.service';

@Component({
  selector: 'app-content',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {

  currencies = [];
  modal;
  search: string;
  validOnTime;
  eurCount = 0;
  result = 0;
  chosenCurrencyRate;
  chosenCurrencyRateFrom;
  otherCurCount = 0;
  resultFrom = 0;
  page = 1;
  pageSize = 5;

  constructor(
    private currencyService: CurrencyService,
    private datePipe: DatePipe,
    private componentObserverService: ComponentObserverService
  ) {
  }

  ngOnInit(): void {
    this.validOnTime = new Date();
    this.currencyService.getCurrencyList()
      .pipe(finalize(() => {
        this.validOnTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      }))
      .subscribe(res => this.currencies = res);
  }

  get modalType() {
    return ModalType;
  }

  setModalType(modalType: ModalType) {
    this.modal = modalType;
  }

  setCurrentCurrency(currency: any) {
    localStorage.removeItem('currency');
    localStorage.setItem('currency', JSON.stringify(currency));
  }

  calculate() {
    try {
      this.eurCount = Number(this.eurCount);
      this.result = this.eurCount * Number(this.chosenCurrencyRate);
    } catch (NumberFormatExc) {
      return;
    }
  }

  calculateFrom() {
    try {
      this.otherCurCount = Number(this.otherCurCount);
      this.resultFrom = this.otherCurCount / Number(this.chosenCurrencyRateFrom);
    } catch (NumberFormatExc) {
      this.resultFrom = 0;
      return;
    }
  }

  notifyCurrencyComp(currency: any) {
    this.componentObserverService.notifyCurrencyManagement(currency);
  }

}

export enum ModalType {
  New = 'New', Edit = 'Edit'
}

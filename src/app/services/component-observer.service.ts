import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentObserverService {
  private notifyCurrency = new Subject<any>();

  notifyEditCurrency = this.notifyCurrency.asObservable();

  constructor() {}

  public notifyCurrencyManagement(currency: any) {
    if (currency) {
      this.notifyCurrency.next(currency);
    }
  }

}

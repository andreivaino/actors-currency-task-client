import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CurrencyService} from '../../services/currency.service';
import {finalize} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ComponentObserverService} from '../../services/component-observer.service';

@Component({
  selector: 'app-currency-edit',
  templateUrl: './edit-currency.component.html'
})
export class EditCurrencyComponent implements OnInit {

  currencyForm: FormGroup;
  currency: any = {};
  subscriptionForMainComp: Subscription;

  constructor(
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder,
    private componentObserverService: ComponentObserverService
  ) { }

  ngOnInit(): void {
    this.subscriptionForMainComp = this.componentObserverService.notifyEditCurrency.
    subscribe(res => {
      this.currency = res;
      this.initCurrency();
      this.initForm();
    });
    if (this.currency) {
      this.initForm();
    }
  }

  initCurrency() {
    this.currency = JSON.parse(localStorage.getItem('currency'));
  }

  initForm() {
    this.currencyForm = this.formBuilder.group({
      id: [Number(this.currency.id)],
      code: [this.currency.code, [
        Validators.required,
        Validators.pattern(/^[A-zЁёА-яÕõÜüÖöÄäŽž]{1,10}$/)
      ]],
      name: [this.currency.name, [
        Validators.required,
        Validators.pattern(/^[A-zЁёА-яÕõÜüÖöÄäŽž\s]{1,25}$/)
      ]],
      rate: [this.currency.rate, [
        Validators.required,
        Validators.pattern(/^[0-9.,]+$/)
      ]]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.currencyForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit() {
    const controls = this.currencyForm.controls;
    if (this.currencyForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.updateCurrency(this.currencyForm.value);
    }
  }

  updateCurrency(currency: any) {
    this.currencyService.updateCurrency(currency)
      .pipe(finalize(() => {
        window.location.reload();
      }))
      .subscribe();
  }

}

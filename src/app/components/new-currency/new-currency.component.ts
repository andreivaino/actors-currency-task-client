import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CurrencyService} from '../../services/currency.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-new-currency',
  templateUrl: './new-currency.component.html'
})
export class NewCurrencyComponent implements OnInit {

  currencyForm: FormGroup;

  constructor(
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.currencyForm = this.formBuilder.group({
      code: ['', [
        Validators.required,
        Validators.pattern(/^[A-zЁёА-яÕõÜüÖöÄäŽž]{1,10}$/)
      ]],
      name: [null, [
        Validators.required,
        Validators.pattern(/^[A-zЁёА-яÕõÜüÖöÄäŽž\s]{1,25}$/)
      ]],
      rate: [null, [
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
    }
    this.createCurrency(this.currencyForm.value);
  }

  createCurrency(currency: any) {
    this.currencyService.createCurrency(currency)
      .pipe(finalize(() => {
        window.location.reload();
      }))
      .subscribe();
  }

}

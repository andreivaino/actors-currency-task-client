import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NewCurrencyComponent } from './components/new-currency/new-currency.component';
import { EditCurrencyComponent } from './components/edit-currency/edit-currency.component';
import {OwnFilter} from './pipes/OwnFilter';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {PipesModule} from 'pipes-module';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewCurrencyComponent,
    EditCurrencyComponent,
    OwnFilter
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgSelectModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

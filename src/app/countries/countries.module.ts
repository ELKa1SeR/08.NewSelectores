import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorPagesComponent } from './pages/selector-pages/selector-pages.component';
import { CountriesRoutes } from './countries.routing';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SelectorPagesComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutes,
    ReactiveFormsModule,
  ]
})
export class CountriesModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesRoutes } from './countries/countries.routing';
import { SelectorPagesComponent } from './countries/pages/selector-pages/selector-pages.component';

const routes: Routes = [
 {path: 'selector',
 children:[
  { path: 'selector', component: SelectorPagesComponent},
  {path:'**', redirectTo:'selector'}
 ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

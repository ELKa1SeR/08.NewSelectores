import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrls: []
})
export class SelectorPagesComponent implements OnInit{

  public countriesByRegion: SmallCountry[] = [];
  public borders: string[]=[]

  public myForm : FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })

    constructor(
      private fb : FormBuilder,
      private countriesServices: CountriesService
    ){}


  ngOnInit(): void {

    this.onRegionChanged();
    this.OnCountryChanged();
  }

    get regions(): Region[]{
      return this.countriesServices.regions;
    }

     onRegionChanged(): void{
      this.myForm.get('region')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.borders= []),
      switchMap( region => this.countriesServices.getCountriesByRegion(region))
    )
    .subscribe( countries => {
      this.countriesByRegion = countries;
    });
    }

    OnCountryChanged():void{
      this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter( (value:string) => value.length > 0 ),
         switchMap( alphaCode => this.countriesServices.getCountryByAlphaCode(alphaCode))
      )
      .subscribe( country => {
        this.borders= country.borders;

      });
    }


}

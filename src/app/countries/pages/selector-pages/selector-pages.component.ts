import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrls: []
})
export class SelectorPagesComponent implements OnInit{

  public countriesByRegion: SmallCountry[] = [];

  public myForm : FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required]
  })

    constructor(
      private fb : FormBuilder,
      private countriesServices: CountriesService
    ){}


  ngOnInit(): void {

    this.onRegionChanged();
  }

    get regions(): Region[]{
      return this.countriesServices.regions;
    }

     onRegionChanged(): void{
      this.myForm.get('region')!.valueChanges
    .pipe(
      switchMap( region => this.countriesServices.getCountriesByRegion(region))
    )
    .subscribe( countries => {
      this.countriesByRegion = countries;
    });
    }


}

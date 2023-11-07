import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CityService } from '../city.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Weather } from './weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnChanges{
  
  @Input() city = ''; //input the city name from parent component.

  show: boolean = false;


  //injecting the required service
  constructor(private service: CityService){}


  /**
   * ngOnChanges monitors the Input variable (city) for changes. As soon as
   * any changes detected on the city variable this method subscribe to the 
   * loadGeoLocation method to fetch weather data from backend.
   */

  day: string = '';
  date: string = '';
  temp: number = 0;
  temp_min: number = 0;
  temp_max: number = 0;
  sky: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      this.service.loadGeoLocation(this.city).subscribe({
        next: (response: Weather) => {
          this.show = true;
          this.day = response.day;
          this.date = response.date;
          this.temp = Math.ceil(response.temp - 273.15);
          this.temp_min = Math.ceil(response.temp_min - 273.15);
          this.temp_max = Math.ceil(response.temp_max - 273.15);
          this.sky = response.sky;
      },error: (error: HttpErrorResponse) => {
        console.log(error)
      }})
    }
  }
}

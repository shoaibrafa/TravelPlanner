import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CityService } from '../city.service';
import { HttpErrorResponse } from '@angular/common/http';
import { City } from './city.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent  implements OnInit{


  /**
   * Injecting the required service.
   * @param cityservice 
   */
  constructor(private cityservice: CityService){}

  /**
   * When the component loads the ngOnInit method calls 
   * allCityNames() method.
   */
  ngOnInit(): void {
    this.allCityNames();
  }

  /**
   * The following two methods are responsible for handling
   * the pull down menu.
   */

  isDropdownOpen = false;
  selectedCity: string = '';


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSelectCity(city: string) {
    this.selectedCity = city; //get the selected city.
    this.getCity(city)  // call the getCity method to fetch related info.
  }


  /**
   * The following method fetches on the city names from backend.
   * The city names are display on the pull down menu.
   */

  citynameslist: string[] = [];

  allCityNames() {
    this.cityservice.fetchCityNames().subscribe({
      next: (response) => {
        response.forEach(cityname => { //loop through response and push them to the allCityNames array.
          this.citynameslist.push(cityname.toString());
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }


  /**
   * The following method is subscribing to fetchCity method
   * to fetch city information from backend and storing
   * the information on the vairables. If this method recieves
   * a 200 response it calls getImage() to load the related 
   * image of the city.
   * @param city 
   */

  city_info: City | null = null;
  currentCity: string = '';

  getCity(city: string){
    this.cityservice.fetchCity(city).subscribe({
      next: (response: City) => {
        this.getImage(city);
        this.currentCity = city;
        this.city_info = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  /**
   * Subscribing to loadCityImage service method to 
   * load city image from backend and store it to the
   * city_image variable as string.
   */

  city_image: string = '';

  getImage(city: string){
    this.cityservice.loadCityImage(city).subscribe(image => {
      this.city_image = image;
    })
  }
}

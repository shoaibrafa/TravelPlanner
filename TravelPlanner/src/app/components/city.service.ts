import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { City } from './city/city.model';
import { RootService } from '../root.service';
import { Weather } from './weather/weather.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  rootService: any;

  constructor(private http: HttpClient, private service: RootService) { }


  /**
   * This method fetches city names from backend. The data is then
   * consumed by the pull down menu.
   * @returns 
   */
  fetchCityNames(): Observable<String[]>{
    return this.http.get<string[]>(this.service.host + 'all')
  }


  /**
   * This method is used to fetch city info from backend.
   * @param city 
   * @returns 
   */

  fetchCity(city: string): Observable<City> {
    return this.http.get<City>(this.service.host + 'getcity/' + city);
  }



  /**
   * This method is responsible for getting the city image from backend
   * and return it as string to the caller.
   * @param city 
   * @returns 
   */
  loadCityImage(city: string): Observable<string> {
    const imageUrl = this.service.host + 'image/' + city;
    return this.http.get(imageUrl, {responseType: 'blob' }).pipe(
      switchMap(response => {
        const reader = new FileReader();
        return new Observable<string>((observer) => {
          reader.onloadend = () => {
            const image: string = reader.result as string;
            observer.next(image); 
            observer.complete();
          };
          reader.readAsDataURL(response);
        });
      })
    );    
  }


  /**
   * This method is fetching weather data.
   * @param city 
   * @returns 
   */

  loadGeoLocation(city: string): Observable<Weather>{
    let url = this.service.host + 'temperature/' + city;
    return this.http.get<Weather>(url);
  }
}

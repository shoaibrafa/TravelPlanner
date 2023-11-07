import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  //backend url.
  host: string = 'http://10.0.0.128:8080/';
  constructor() { }
}

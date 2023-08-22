import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  url = environment.apiUrl
  constructor(private httpClient : HttpClient) { }


  getSearch(data : any){
    return this.httpClient.post(this.url + '/products/getDetails' , data , {
      headers : new HttpHeaders().set('content-type','application/json')
    })
  }


}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
url = environment.apiUrl
  constructor(private httpClient : HttpClient) { }

  signUp(data : any){
    return this.httpClient.post(this.url + 
      "/user/signup", data, {
        headers : new HttpHeaders().set('ContentType' , 'application/json')
      })
  }

  // forgotPassword(data : any){
  //   return this.httpClient.post(this.url + '/user/forgotpassword' , data , {
  //     headers : new HttpHeaders().set('content-type','application/json')
  //   })
  // }

  /* getEmail and forPass Both are working for the Forgot Password section.............. a */

getEmail(data : any){
    return this.httpClient.post(this.url + '/user/getEmail' , data , {
      headers : new HttpHeaders().set('content-type','application/json')
    })
  }


  forPass(data : any){
  return this.httpClient.post(this.url + '/user/ChangePass' , data , {
    headers : new HttpHeaders().set('content-type','application/json')
  })
  }

  // login(data : any){
  //   return this.httpClient.post(this.url + '/user/login' , data , {
  //     headers : new HttpHeaders().set('content-type' , 'application/json')
  //   })
  // }
  login(data: {}): Observable<any> {
    console.log(data);
    return this.httpClient.post(this.url + '/user/login' , data , {
      headers : new HttpHeaders().set('content-type' , 'application/json')
    })
  }

  checkToken(){
    return this.httpClient.get(this.url + '/user/checktoken')
  }

  changePassword(data:any){
    return this.httpClient.post(this.url + '/user/changepassword' , data , {
      headers : new HttpHeaders().set('content-type' , 'application/json')
    })
  }

  getUsers(){
    return this.httpClient.get(this.url + '/user/get');
  }

  update(data:any){
    return this.httpClient.patch(this.url + '/user/update' , data , {
      headers : new HttpHeaders().set('content-type' , 'application/json')
    })
  }
  


}

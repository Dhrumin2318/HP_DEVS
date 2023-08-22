import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl

  constructor(private httpClient : HttpClient) { }


    add(data:any){
    return this.httpClient.post(this.url + '/products/add' , data , {
      headers : new HttpHeaders().set('content-type' , 'application/json')
    })
  }

  update(data:any){
    return this.httpClient.patch(this.url + '/products/update' , data , {
      headers : new HttpHeaders().set('content-type' , 'application/json')
    })
  }

  // getProducts(){
  //   return this.httpClient.get(this.url + '/products/get')
  // }

  getProducts(data:any){
    return this.httpClient.post(this.url + '/products/getDetails' , data , {
      headers : new HttpHeaders().set('content-type' , 'application/json')

    })
  }


  updateStatus(data:any){
    return this.httpClient.patch(this.url + '/products/updateStatus' , data , {
      headers : new HttpHeaders().set('content-type' , 'application/json')
    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url + '/products/delete/'+id , {
      headers : new HttpHeaders().set('content-type' , 'application/json')
    })
  }


  getProductsByCategory(id:any){
    return this.httpClient.get(this.url + '/products/getbycategory/'+id);

  }

  getProductsById(id:any){
    return this.httpClient.get(this.url + '/products/getbyproduct/'+id);

  }
}

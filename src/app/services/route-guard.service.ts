import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import jwt_Decode from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth : AuthService , public router : Router , private snackbarService : SnackbarService) { }

  canActivate(route : ActivatedRouteSnapshot) : boolean{
    let expectedRoleArray :any = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;
    // const email : any = localStorage.getItem('email');
    const name: any = localStorage.getItem('name');

    const token : any = localStorage.getItem('token');
    var tokenPayload: any;
    try{
      tokenPayload = jwt_Decode(token , name);
      // console.log(tokenPayload);
    }
    catch(err){
      localStorage.clear();
      this.router.navigate(['/'])
    }
    
    let checkRole = false;

    for(let i = 0 ; i < expectedRoleArray.length ; i++){
      if(expectedRoleArray[i] == tokenPayload.role){
        checkRole = true;
      }
    }
if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'){
if(this.auth.isAuthenticated() && checkRole){
  return true;
} 
else{
  this.snackbarService.error(GlobalConstants.unauthorized);
  this.router.navigate(['/cafe/dashboard']);
  return false

}
   


}
else{
  this.router.navigate(['/']);
  localStorage.clear();
  return false;
}
  }
}

import { Inject, Injectable, NgZone } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar , MatSnackBarConfig} from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private config: MatSnackBarConfig;

  constructor(private snackbar : MatSnackBar , private zone: NgZone,) { 
    this.config = new MatSnackBarConfig();
    // this.config.panelClass = ["mat-snack-bar-container"];
    // this.config.panelClass = ["success"]
    this.config.verticalPosition = "top";
    this.config.horizontalPosition = "right";
    this.config.duration = 2000;
    
  }


  error(message: string) {
    // this.config.panelClass = ["mat-snack-bar-container", "error"];
    // this.config.panelClass = ["mat-snack-bar-container" , 'error']
    this.show(message , 'error-snackbar');
  }

  success(message: string) {
    // console.log("success");
    // this.config.panelClass = ["mat-snack-bar-container" , "success"];
    this.show(message , 'success-snackbar');
  }

  warning(message: string) {
    // this.config.panelClass = ["mat-snack-bar-container", "warning"];
    this.show(message , 'warn-snackbar');
  }

  private show(message: string , panelClass : string) {
    
    // config = config || this.config;
    this.zone.run(() => {

      this.config.panelClass = [panelClass]
      this.snackbar.open(message, "Close", this.config);
    });
  }

  dismiss() {
    this.snackbar.dismiss();
  }

//   openSnackBar(responseMessage: string  , action : string){
// console.log("heelo");

//     if(action === 'error'){
//       this.snackbar.open(responseMessage , '' , {
//         horizontalPosition : 'center',
//         verticalPosition : 'top',
//         duration : 2000,
        
//         panelClass : ['black-snackbar']
//       });
//     }else{
//       console.log("hiiii");
      
//       this.snackbar.open(responseMessage , '' , {
//         horizontalPosition : 'center',
//         verticalPosition : 'top',
//         duration : 2000,
//         panelClass : 'green-snackbar'
//         // panelClass:['customClass'],
//         // // panelClass : 'green-snackbar'
//     });

//   }
// }
}
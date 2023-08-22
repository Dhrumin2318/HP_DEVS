import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm : any = FormGroup;
  responseMessage : any;

constructor(private formBuilder : FormBuilder , private userService : UserService , 
  private dialogRef : MatDialogRef<ChangePasswordComponent>,
  private ngxService : NgxUiLoaderService,
  private snackbarService : SnackbarService){}


  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword:[null , [Validators.required]],
      newPassword:[null , [Validators.required]],
      confirmPassword:[null , [Validators.required]]
    })
    
  }

  validateSubmit(){
    if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value ){
      return true;
    }else{
      return false;
    }
  }

  handleChangePassSubmit(){
    this.ngxService.start();
    // this.validateSubmit();
    var formData = this.changePasswordForm.value;
    var data = {
      oldPassword : formData.oldPassword,
      newPassword : formData.newPassword,
      confirmPassword : formData.confirmPassword
    }
    this.userService.changePassword(data).subscribe((response : any) => {
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbarService.success(this.responseMessage,)
    },
    (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.error(this.responseMessage);
    })
  }


  test5: string = '';

  controlHasError(validation: any, controlName: any): any {
    const control = this.changePasswordForm.controls[controlName];
    if (controlName == 'oldPassword' || controlName == 'newPassword' || controlName == 'confirmPassword') {
      return (this.test5 =
        control.Value == ''
          ? 'Please enter password'
          : control && control.valid
          ? ''
          : 'Please enter valid password');
    }
  }
}

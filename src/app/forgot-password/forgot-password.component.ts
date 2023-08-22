import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any = FormGroup;
  responseMessage: any;
  // router: any;
  Newemail: any = null;
  changedModel = true;
  changed = true;
  PasswordFormGroup: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarservice: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
    });

    this.PasswordFormGroup = this.formBuilder.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  updateSubmit() {
    this.ngxService.start();
    var formData = this.PasswordFormGroup.value;
    var data = {
      newPassword: formData.password,
      email: this.Newemail,
    };

    this.userService.forPass(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
      //  this.responseMessage =  response?.message(this.comparePassword())
        // console.log(this.comparePassword());
        this.responseMessage = response?.message;
        this.snackbarservice.success(this.responseMessage);
        this.dialogRef.close();
        this.router.navigate(['/']);
      },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarservice.error(this.responseMessage);
      }
    );
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email,
    };
    this.userService.getEmail(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        // console.log(response);
        this.responseMessage = response[1].message;
        this.Newemail = response[0].email;
        this.snackbarservice.success(this.responseMessage);
        this.changedModel = false;
        // this.dialogRef.close();
      },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarservice.error(this.responseMessage);
      }
    );
  }

  test5: string = '';

  controlHasError(validation: any, controlName: any): any {
    const control = this.forgotPasswordForm.controls[controlName];
    if (controlName == 'password') {
      return (this.test5 =
        control == ''
          ? 'Please enter password'
          : control && control.valid
          ? ''
          : 'Please enter valid password');
    }
  }

  test6: string = '';

  compare(validation: any, controlName: any): any {
    const control = this.PasswordFormGroup.controls[controlName];
    if (controlName == 'password' && controlName == 'confirmPassword') {
      return (this.test6 = control == '' ? 'please Enter Password' : ' ');
    }
  }
  // item : string = '';
  // CFPassword: boolean = false;

  comparePassword(): any {
    // this.item = item
    // if (this.PasswordFormGroup.valid) {
      if (
        this.PasswordFormGroup.value.password !==
        this.PasswordFormGroup.value.confirmPassword
      ) {
      //  this.CFPassword = true 
      return this.test6 = "This is invalid"
      
      // }
    }
  }
}

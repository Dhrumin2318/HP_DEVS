import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constant';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ViewEncapsulation } from '@angular/core';
// import { error } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      contactNumber: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.contactRegex)],
      ],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password,
    };
    this.userService.signUp(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackbarService.success(this.responseMessage);
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
        this.snackbarService.error(this.responseMessage);
      }
    );
  }
  test2: string = '';
  test3: string = '';
  test4: string = '';
  test5: string = '';

  controlHasError(validation: any, controlName: any): any {
    const control = this.signupForm.controls[controlName];
    if (controlName == 'name') {
      return (this.test2 =
        control.value == ''
          ? 'Please enter name'
          : control.value && control.valid
          ? '12344'
          : 'Please enter valid name');
    } else if (controlName == 'email') {
      return (this.test3 =
        control.value == ''
          ? 'Please enter email'
          : control.value && control.valid
          ? ''
          : 'Please enter valid email');
    } else if (controlName == 'contactNumber') {
      return (this.test4 =
        control.value == ''
          ? 'Please enter Contact Number'
          : control.value && control.valid
          ? ''
          : 'Please enter valid Contact Number');
    } else if (controlName == 'password') {
      return (this.test5 =
        control.value == ''
          ? 'Please enter Password'
          : control.value && control.valid
          ? ''
          : 'Please enter valid Password');
    }
  }
}

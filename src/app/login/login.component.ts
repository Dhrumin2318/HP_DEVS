import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constant';
// import { json } from 'stream/consumers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LogInForm: any = FormGroup;
  responseMessage: any;
loggedData:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.LogInForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      password: [null, [Validators.required]],
    });
  }

  async handleSubmit() {
    this.ngxService.start();
    var formData = this.LogInForm.value;
    var data = {
      email: formData.email,
      password: formData.password,
    };
    await this.userService.login(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        console.log(response);
        this.loggedData=response.response
        // console.log(response);
        // console.log(this.loggedData);
        localStorage.setItem("loginUserData", JSON.stringify(this.loggedData));
        

        // setTimeout(() => {
        //   console.log(
        //     localStorage.setItem(
        //       'responseDataOfLoginUser',
        //       JSON.stringify(response.response)
        //     )
        //   );
        // }, 5000);
        this.dialogRef.close();
        //  var dataLogin= localStorage.setItem("responseDataOfLoginUser", JSON.stringify(response.response));
        localStorage.setItem('token', response.token);
        this.router.navigate(['/cafe/dashboard  ']);
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

  // test2: string = '';
  test3: string = '';
  // test4: string = '';
  test5: string = '';

  controlHasError(validation: any, controlName: any): any {
    const control = this.LogInForm.controls[controlName];
    if (controlName == 'email') {
      return (this.test3 =
        control.value == ''
          ? 'Please enter email'
          : control.value && control.valid
          ? ''
          : 'Please enter valid email');
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

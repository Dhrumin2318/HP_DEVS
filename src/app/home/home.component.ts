import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { Route, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private userServices: UserService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.userServices.checkToken().subscribe((response : any) => {
        this.router.navigate(['/cafe/dashboard']);
      }, (error : any) => {
        // console.log(error);
      })
    }
  }

  SignupAction() {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.width = '550px';
    // dialogconfig.maxHeight = '600px'
    this.dialog.open(SignupComponent, dialogconfig);
  }

  forgotPasswordAction() {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.width = '550px';
    this.dialog.open(ForgotPasswordComponent, dialogconfig);
  }

  loginAction() {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.width = '550px';
    this.dialog.open(LoginComponent, dialogconfig);
  }
}

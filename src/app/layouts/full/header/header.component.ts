import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class AppHeaderComponent implements OnInit {
  role: any;
  loggedUser:any;

  // data = JSON.parse(localStorage.getItem("response"));

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage?.getItem('loginUserData') || '{}');
    // console.log(this.loggedUser);
    
    // console.log(this.data);
  }

  logout() {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.data = {
      message: 'LogOut',
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogconfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (user) => {
        dialogRef.close();
        localStorage.clear();
        this.router.navigate(['/']);
      }
    );
  }

  changePassword() {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.width = '550px';
    this.dialog.open(ChangePasswordComponent, dialogconfig);
  }
}

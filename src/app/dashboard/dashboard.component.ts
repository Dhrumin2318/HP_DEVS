import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constant';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit , OnInit {
responseMessage : any;
data:any;
userDetails : any = localStorage.getItem('loginUserData');
user:any = JSON.parse(this.userDetails)

	ngAfterViewInit() { }

	ngOnInit(): void {
		// console.log(this.user);
	}

	constructor(private dashboardService : DashboardService , 
		private ngxService : NgxUiLoaderService ,
		 private snackbarService : SnackbarService,
		 private router:Router) {
		this.ngxService.start();
		this.DashboardData();
	}

	DashboardData(){
		this.dashboardService.getDetails().subscribe((response:any) => {
			this.ngxService.stop();
			this.data = response;
			// console.log(response);
		},
		(error: any) => {
			this.ngxService.stop();
			if (error.error?.message) {
			  this.responseMessage = error.error?.message;
			} else {
			  this.responseMessage = GlobalConstants.genericError;
			}
			this.snackbarService.error(this.responseMessage);
		})
	}

	routerLink(){
        this.router.navigate(['cafe/category']);
        this.router.navigate(['cafe/product']);

	}
}

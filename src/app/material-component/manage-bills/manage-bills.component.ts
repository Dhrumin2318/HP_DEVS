import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EventEmitter } from 'protractor';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-bills',
  templateUrl: './manage-bills.component.html',
  styleUrls: ['./manage-bills.component.css'],
})
export class ManageBillsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'contactNumber',
    'email',
    'total',
    'edit',
  ];
  dataSource: any;
  responseMessage: any;
  // value:any;

  constructor(
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private router: Router,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.billService.getBills().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
        // var data = response;
        // console.log(response[0].productDetails);
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

  seeData(value: any) {
    //  console.log(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.disableClose = false;
    dialogConfig.enterAnimationDuration = '1.5s'
    dialogConfig.exitAnimationDuration = '2s';
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    // dialogConfig.


    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
    dialogRef.componentInstance.data=value

    // this.dialog.open(ViewBillProductsComponent, {
    //   width: '30%', disableClose: false, data: value
    // });
    // this.router.events.subscribe(() => {
    //   dialogRef.close();
    // });
  }
  // console.log(element , value);

    // var ts= `
    // <html>
    // <head>
    // <style>
    //     table{
    //     font-family: arial,sans-serif;
    //     border-collapse: collapse;
    //     width: 100%;
    // }
    // td,th{
    //     border: 1px solid #dddddd;
    //     text-align-last: left;
    //     padding: 8px;
    // }

    // </style>
    // </head>
    // <body>
    //     <h3 style="text-align: center;">C@fe M@n@gement System</h3>
    //         <table>
    //             <tr>
    //                 <th>Name :</th>
    //                 <th>email :</th>
    //             </tr>
    //             <tr>
    //                 <th>contact : </th>
    //                 <th>Payment Method : </th>
    //             </tr>
    //         </table>
    // <br>
    // <hr>
    //         <h3>Product Details</h3>
    //         <table>
    //             <tr>
    //                 <th>Name</th>
    //                 <th>Category</th>
    //                 <th>Quantity</th>
    //                 <th>Price</th>
    //                 <th>Sub-Total</th>
    //             </tr>

    //                     <tr>
    //                         <td>cafe</td>
    //                         <td>cafe</td>
    //                         <td>cafe</td>
    //                         <td>cafe</td>
    //                         <td>cafe</td>
    //                     </tr>
    //         </table>

    //         <h3 style="color: red;">Total : </h3>
    //         <h3 style="text-align: center;">Thank You For Visiting Visit Again!!</h3>

    // </body>
    // </html>
    // `
}

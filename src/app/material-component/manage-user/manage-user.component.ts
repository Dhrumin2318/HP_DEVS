import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit{

  displayedColumns : string[] = ['name' , 'email' , 'contactNumber' , 'status'];
  dataSource : any;
  responseMessage : any;

  constructor(
    private ngxService : NgxUiLoaderService,
    private userService : UserService,
    private snackbarService : SnackbarService
  ){}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
    
  }

  tableData(){
    this.userService.getUsers().subscribe((response:any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.error(this.responseMessage);
    })
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleChangeAction(status : any , id: any){
this.ngxService.start();
var data = {
  status : status.toString(),
  id:id
}
this.userService.update(data).subscribe((response:any) => {
  this.ngxService.stop();
  this.responseMessage = response?.message;
  this.snackbarService.success(this.responseMessage);
},(error) => {
  this.ngxService.stop();
  if (error.error?.message) {
    this.responseMessage = error.error?.message;
  } else {
    this.responseMessage = GlobalConstants.genericError;
  }
  this.snackbarService.error(this.responseMessage);
})
  }

}

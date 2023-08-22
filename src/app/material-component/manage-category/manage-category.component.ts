import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogTitle } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})



export class ManageCategoryComponent implements OnInit{
  @ViewChild('input', {static:true}) inputElement: ElementRef;

  displayedColumns : string[] = ['name' , 'edit']
  dataSource : any;
  responseMessage : any;
  input :any = ''

  constructor(private categoryService : CategoryService , 
    private ngxService : NgxUiLoaderService , 
    private dialog : MatDialog,
    private snackbarService : SnackbarService,
    private router : Router,
    inputElement : ElementRef){ 
      this.inputElement = inputElement
    }


    ngOnInit(): void {
      this.ngxService.start();
      // console.log(this.input);
      this.tableData(this.input)
    }

    tableData(data : any){
      var dataOf = {
        name: data,
      };
      this.categoryService.getCategory(dataOf).subscribe((response : any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response)
        // console.log(this.dataSource);
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

    applyFilter(){
      this.input = this.inputElement.nativeElement.value
      this.tableData(this.input) 
      // console.log(this.input);
    }


    handleAddAction(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action : 'Add'
      }
      dialogConfig.width = '850px';
      const dialogRef = this.dialog.open(CategoryComponent , dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      })
      const sub = dialogRef.componentInstance.onAddCategory.subscribe((response) => {
        this.tableData('');
      })

    }

    handleEditAction(values : any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action : 'Edit',
        data:values
      }
      dialogConfig.width = '850px';
      const dialogRef = this.dialog.open(CategoryComponent , dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      })
      const sub = dialogRef.componentInstance.onEditCategory.subscribe((response) => {
        this.tableData('');
      })
    }
}

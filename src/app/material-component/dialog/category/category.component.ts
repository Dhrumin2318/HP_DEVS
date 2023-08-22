import { Component, EventEmitter, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  // encapsulation: ViewEncapsulation.None,
  // styles: [`:host { @include custom-snackbar-theme; }`]
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = 'Add';
  action : any = 'Add';
  responseMessage:any;
// nameControl: any;
nameControl = new FormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder , 
  private categoryService : CategoryService , 
  public dialogRef : MatDialogRef<CategoryComponent>,
  private snackbarService : SnackbarService) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name:[null ,[Validators.required]]
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction='Edit';
      this.action='Update';
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === 'Edit'){
      this.edit()
    }
    else{
      this.add();
    }
  }

  add(){

    var formData = this.categoryForm.value;
    var data = {
      name : formData.name
    }
    this.categoryService.add(data).subscribe((response:any)=> {
      this.dialogRef.close();
      this.onAddCategory.emit();
      this.responseMessage= response.message;
      this.snackbarService.success(this.responseMessage)
    },(error) => {
      this.dialogRef.close();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.error(this.responseMessage);
    })
  }

  edit(){
    var formData = this.categoryForm.value;
    var data = {
      id:this.dialogData.data.id,
      name : formData.name
    }
    this.categoryService.update(data).subscribe((response:any)=> {
      this.dialogRef.close();
      this.onEditCategory.emit();
      this.responseMessage= response.message;
      this.snackbarService.success(this.responseMessage)
    },(error) => {
      this.dialogRef.close();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.error(this.responseMessage);
    })

  }


  test2 : string = '';
  controlHasError(validation: any, controlName: any): any {

    const control = this.categoryForm.controls[controlName];
    if (controlName == 'name') {
      return (this.test2 =
        control.value == ''
          ? 'Please enter name'
          : control.value && control.valid
          ? '12344'
          : 'Please enter valid name');
        }
        // console.log("hii");
  }
}

import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = 'Add';
  action : any = 'Add';
  responseMessage:any;
  categories: any = [];


constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder , 
  private categoryService : CategoryService , 
  private productService : ProductService,
  public dialogRef : MatDialogRef<ProductComponent>,
  private snackbarService : SnackbarService) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name:[null ,[Validators.required , Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId:[null, [Validators.required]],
      description:[null, [Validators.required]],
      price:[null, [Validators.required]],
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction='Edit';
      this.action='Update';
      this.productForm.patchValue(this.dialogData.data);
    }
    this.getCategorys('');
  }


  getCategorys(data:any){
    var dataOf={
      name: data
    }
    this.categoryService.getCategory(dataOf).subscribe((response : any) => {
      this.categories = response;
      // console.log(this.categories[0].id);
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

  handleSubmit(){
    if(this.dialogAction === 'Edit'){
      this.edit()
    }
    else{
      this.add();
      // console.log("add working");
    }
  }

  add(){
    var formData = this.productForm.value;
    var data = {
      name : formData.name,
      categoryId : formData.categoryId,
      description : formData.description,
      price : formData.price,
    }
    this.productService.add(data).subscribe((response:any)=> {
      this.dialogRef.close();
      this.onAddProduct.emit();
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
    var formData = this.productForm.value;
    var data = {
      id:this.dialogData.data.id,
      name : formData.name,
      categoryId : formData.categoryId,
      price : formData.price,
      description : formData.description
    }
    this.productService.update(data).subscribe((response:any)=> {
      this.dialogRef.close();
      this.onEditProduct.emit();
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

    const control = this.productForm.controls[controlName];
    if (controlName == 'name') {
      return (this.test2 =
        control.value == ''
          ? 'This Field is Required'
          : control.value && control.valid
          ? '12344'
          : 'Please enter valid name');
        }
        // console.log("hii");
  }
}

  
  



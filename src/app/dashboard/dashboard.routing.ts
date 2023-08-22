import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { Component } from '@angular/core';
import { CategoryComponent } from '../material-component/dialog/category/category.component';
import { ManageCategoryComponent } from '../material-component/manage-category/manage-category.component';
import { ManageProductComponent } from '../material-component/manage-product/manage-product.component';
import { ManageBillsComponent } from '../material-component/manage-bills/manage-bills.component';

export const DashboardRoutes: Routes = [{
  path: '',
  component: DashboardComponent,
} ,
{

  path : '',
  children : [
    {
      path : 'category',
      component : ManageCategoryComponent,
  }
  ]
},
{

  path : '',
  children : [
    {
      path : 'product',
      component : ManageProductComponent,
  }
  ]
},
{

  path : '',
  children : [
    {
      path : 'bill',
      component : ManageBillsComponent,
  }
  ]
}
//  {
//   path : "cafe/category",
//   component : ManageCategoryComponent
// }
];

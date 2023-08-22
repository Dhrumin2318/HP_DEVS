import { NgClass } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}



const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
  { state: 'order', name: 'Manage-order', icon: 'list_alt', role: '' },
  { state: 'bill', name: 'Manage-Bill', icon: 'save', role: '' },
  { state: 'user', name: 'Manage-user', icon: 'people', role: 'admin'},
  {
    state: 'category',
    name: 'Manage-Category',
    icon: 'category',
    role: 'admin',
  },
  {
    state: 'product',
    name: 'Manage-Product',
    icon: 'inventory',
    role: 'admin',
  },


];




@Injectable()
export class MenuItems {
  getMenuItem(): Menu[] {
    return MENUITEMS;
  }
}

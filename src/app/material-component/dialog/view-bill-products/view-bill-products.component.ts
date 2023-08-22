import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss'],
})
export class ViewBillProductsComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  data:any;
  prod:any

  //  Another Method for getting data in matdialog......

  // constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ViewBillProductsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    // console.log(this.data);
    this.prod = JSON.parse(this.data.productDetails)
    // console.log(JSON.parse(this.data.productDetails));
    // console.log(this.data.productDetails);
    
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FileUrl = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FileUrl, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`${this.data.id}.pdf`); 

    });
  }


  // dataSource = new MatTableDataSource();



  // deleteUser() {
  //   this.dataSource.data.splice(this.dataSource.data.indexOf(this.data), 1);
  //   this.dataSource.data = [...this.dataSource.data];
  //   console.log(this.dataSource.data);
  //   console.log(this.data)
  // }

  // click(): void {
  //   this.dialogRef.close();
  // }
}

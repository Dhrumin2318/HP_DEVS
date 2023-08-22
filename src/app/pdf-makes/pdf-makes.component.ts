// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-pdf-makes',
//   templateUrl: './pdf-makes.component.html',
//   styleUrls: ['./pdf-makes.component.css']
// })
// export class PdfMakesComponent {

// }

import { Component, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
    selector: 'app-pdf-makes',
    templateUrl: './pdf-makes.component.html',
    styleUrls: ['./pdf-makes.component.css']
  })
export class PdfMakesComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;
  USERS = [
    {
      id: 1,
      name: 'Abc',
      email: 'therichposts@gmail.com',
      phone: '1-111-111-1111x1111',
    },
    {
      id: 2,
      name: 'Ajay Kumar',
      email: 'therichposts@gmail.com',
      phone: '1-111-111-1111x1111',
    },
    {
      id: 3,
      name: 'Ajay Kumar',
      email: 'therichposts@gmail.com',
      phone: '1-111-111-1111x1111',
    },
    {
      id: 4,
      name: 'Ajay Kumar',
      email: 'therichposts@gmail.com',
      phone: '1-111-111-1111x1111',
    },
    {
      id: 5,
      name: 'Ajay Kumar',
      email: 'therichposts@gmail.com',
      phone: '1-111-111-1111x1111',
    },
    {
      id: 6,
      name: 'Ajay Kumar',
      email: 'therichposts@gmail.com',
      phone: '1-111-111-1111x1111',
    },
  ];
  constructor() {}
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}

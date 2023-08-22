import { Component, ElementRef, ViewChild } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

constructor(private testService : TestService){}
// @ViewChild('someInput') someInput!: ElementRef;

  checks(someInput:string){
    var data = {
      name : someInput,
        }
// console.log(someInput);
    this.testService.getSearch(data).subscribe((response:any) => {
      var result = response;
      // console.log(result);

      // const filterValue = (event.target as HTMLInputElement).value;
      // result.filter = filterValue.trim().toLowerCase();
      
    })

  }

}


// 
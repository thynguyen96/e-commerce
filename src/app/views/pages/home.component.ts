import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']

})

export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) { }
  listProduct: any = [];
  ngOnInit() {
    this.http.get('/api/products').subscribe(data => {
      console.log('---')
      console.log(data);
      this.listProduct = data;
    })
    this.http.get('/api/category/all').subscribe((data: any) =>{
     console.log(data);
  });
  this.http.get('/api/category/id/0').subscribe((data: any) =>{
    console.log(data);
 });
 this.http.get('/api/category/id/1').subscribe((data: any) =>{
  console.log(data+"===");
});
this.http.get('/api/category1/1').subscribe((data: any) =>{
  console.log(data + "===");
});
}

}

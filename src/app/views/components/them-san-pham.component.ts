import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Http, Response, Headers } from '@angular/http'
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Product } from 'app/_mocktest/product';

@Component({
  templateUrl: 'them-san-pham.component.html'
})
export class ThemSanPhamComponent implements OnInit {
  products = [];
  productObj: any;
  listProduct: any = [];
  comfirmationString: string = "New product has been added";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private http_: Http) { }

  addProductForm() {
    console.log(this.productForm.value)
  }

  // fetchData() {
  //   this.http.get("http://localhost:3004/products")
  //     .subscribe(
  //     res => {
  //       this.products = res.json()
  //       console.log(this.products)
  //     })
  // }
  // addNewProduct(item) {
  //   this.productObj = {
  //     "name": item.name,
  //     "quality": item.quality,
  //     "price": item.price
  //   }

  //   this.http.post("http://localhost:3004/products", this.productObj).subscribe(
  //     (res) => {
  //       let re: any = {};
  //       re = res;
  //       console.log(re._body);
  //       this.products.push(JSON.parse(re._body));
  //       alert(this.comfirmationString)
  //     }
  //   )
  // }

  deleteProduct(id) {
    if (confirm("Are you sure?")) {

      const url = `${"http://api/products"}/${id}`;
      return this.http.delete(url).toPromise()
        .then(() => {
          this.loadData()
        }
        ).catch(err => console.log(err))
    }
  }

  loadData() {
    this.http.get('/api/products').subscribe(data => {
      console.log('---')
      console.log(data);
      this.listProduct = data;
    })

  }

  ngOnInit() {
    // this.fetchData();
    this.loadData();
    this.productForm = this.fb.group({
      id: '', name: '', quality: '', price: ''
    })
  }



}

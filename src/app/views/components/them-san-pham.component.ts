import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http'

@Component({
  templateUrl: 'them-san-pham.component.html'
})
export class ThemSanPhamComponent implements OnInit{
  products = [];
  productObj: any;
  comfirmationString:string  = "New product has been added";
  private headers = new  Headers({'Content-Type' : 'application/json'});
  
  fetchData() {
    this.http.get("http://localhost:3004/products")
      .subscribe(
      res => this.products = res.json())
  }
  addNewProduct(item){
    this.productObj = {
      "name": item.name,
      "quality": item.quality,
      "price": item.price
    }
    this.http.post("http://localhost:3004/products", this.productObj).subscribe(
      (res: Response) => alert(this.comfirmationString)
    )
  }

  deleteProduct(id) {
    if(confirm("Are you sure?")){

      const url = `${"http://localhost:3004/products"}/${id}`;
      return this.http.delete(url, {headers: this.headers}).toPromise()
      .then(() =>
      {
        this.fetchData()
      }
    ).catch(err => console.log(err))
    }
    }
  ngOnInit() {
    this.fetchData();
    this.productForm = this.fb.group({
      id: '', name:'', quality: '', price :''
    })
  }

  productForm: FormGroup;

  constructor(private fb : FormBuilder, private http: Http) { } addProductForm(){
    console.log(this.productForm.value)
  }

}

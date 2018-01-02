import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
// import { FormGroup } from '@angular/forms/src/model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm: FormGroup; 

  thongbao: string;
  listProduct: any = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {



  }
  public _login(use: any) {
    //  let use: any = {};
    //use.username = username ;
    //use.password = password ;;
    this.thongbao = null;;
    this.loading = true;
    this.http.post('/api/authenticate', use).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      this.loading = false;
      this.thongbao = 'success';
      this.router.navigate(['/dashboard']);
    }, (err: HttpErrorResponse) => {
      if (err.status === 403) {
        this.thongbao = 'tài khõa đã tồn tạ trong hệ thống';
      }
      this.loading = false;
    });
  }
  ngOnInit() {
    this.http.get('/api/products').subscribe(data => {
      console.log('---')
      console.log(data);
      this.listProduct = data;
    })
    this.loginForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    })
  }
  public login() {
    this._login(this.loginForm.value);
  }

}

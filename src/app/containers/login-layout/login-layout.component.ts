import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-login',
  templateUrl: './login-layout.component.html',
  providers: []
})
export class LoginLayoutComponent implements OnInit {
  formLoginAdmin: FormGroup;
  user: any = {};
  token: any = {};
  list: any = [];
  sms: string;

  ngOnInit() {
    this.formLoginAdmin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
  }

  onSubmit() {
    if (this.formLoginAdmin.value.username === "admin" && this.formLoginAdmin.value.password === "123") {
      console.log(this.formLoginAdmin.value.username)
      this.router.navigate(['dashboard'])
    }
  }

  public login() {
    console.log
      (this.formLoginAdmin.value);
    this.http.post('http://localhost:8082/auth/login', this.formLoginAdmin.value).subscribe(data => {
      this.token = data;
      this.sms = ' dang nhap thanh cong';
      localStorage.setItem('token', this.token.access_token);
      this.router.navigate(['dashboard'])

    }, (err: HttpErrorResponse) => {
      console.log
        (err.error);
      if (err.error instanceof Error) {
        this.sms = 'erro client side '
      } else {
        if (err.status === 0) {
          this.sms = ' chua ket noi mang'
        }
        if (err.status === 401) {
          this.sms = 'sai mat khau'
        }
        if (err.status === 500) {
          this.sms = 'sai mat khau'
        }
      }
    });
  }
}

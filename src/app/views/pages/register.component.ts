import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  loading  = false;
  registerForm: FormGroup;

  thongbao: string;
  constructor(private http: HttpClient ,  private fb: FormBuilder , private router: Router ) {

    this.registerForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      re_password: this.fb.control('', Validators.required),
      
    })

    let user: any = {};
    
    
        // user.username = 'k40cntt@gmail.com'
        // user.firstName = 'huynh'; //>?
        // user.lastName = 'thanh'; // ?
        // user.password = '12345678'
    
   
   }
   public _register( use: any ){ 
    this.loading = true ;
    this.http.post('/api/users', use).subscribe((data: any) => {
      console.log(data);
      this.loading = false;
      this.router.navigate(['/pages/login']);
    }, (err: HttpErrorResponse) => {
      if (err.status === 403) {
      this.thongbao = 'tài khõa đã tồn tạ trong hệ thống';
      this.loading = false;
      }
    });
   } 
   public register(){
  //   console.log(this.registerForm.value);
     this._register(this.registerForm.value);
   }

}

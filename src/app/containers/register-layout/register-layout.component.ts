import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register-layout.component.html'
})
export class RegisterLayoutComponent implements OnInit {
  formRegister: FormGroup;

  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, this.passwordMatchValidator)
  }  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
      ? null : { 'mismatch': true };
  }
registerAdmin(){ console.log(this.formRegister.value) }
}

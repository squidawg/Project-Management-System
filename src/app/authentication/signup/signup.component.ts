import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {AuthenticationModel} from "../authentication.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit{
  isLoading = false;
  signUpForm!: FormGroup;
  hide = true;
  error?:string;
  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'login': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  onError(value: any, valueName: string) {
    return this.authentication.getErrorMessage(value, valueName)
  }

  onSubmit(){
    if(!this.signUpForm.valid){
      return;
    }
    const name = this.signUpForm.value.name;
    const login = this.signUpForm.value.login;
    const password = this.signUpForm.value.password;

    this.isLoading = true;
    this.authentication.signUp(name, login, password)
        .subscribe(res => {
          this.isLoading = false;

    }, errRes => {
          console.log(errRes)
          this.error = errRes.error.message
          this.isLoading = false;
    })
    this.signUpForm.reset()
  }

}

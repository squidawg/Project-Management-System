import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../shared/snackbar.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit{

  isLoading = false;
  signUpForm!: FormGroup;
  hide = true;

  constructor(private authentication: AuthenticationService,
              private router: Router,
              private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4)]),
      'login': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4)]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\W)(?!.*\\s).{4,}$')])
    })
  }

  onError(value: any, state?:boolean) {
    return this.authentication.getErrorMessage(value, state);
  }

  onSubmit(){

    const name = this.signUpForm.value.name;
    const login = this.signUpForm.value.login;
    const password = this.signUpForm.value.password;

    this.isLoading = true;
    this.authentication.signUp(name, login, password)
        .subscribe(() => {
          this.isLoading = false;
          this.router.navigate(['/login']);
    }, errMessage => {
          this.snackBar.openSnackBar(errMessage);
          this.isLoading = false;
    })
    this.signUpForm.reset();
  }
}

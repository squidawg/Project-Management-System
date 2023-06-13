import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SnackbarService} from "../../shared/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  signInForm!: FormGroup;
  isLoading = false;
  hide = true;

  constructor(private authentication: AuthenticationService,
              private router: Router,
              private snackBar: SnackbarService) {}

  ngOnInit() {
    this.signInForm = new FormGroup({
      'login': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4)]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\W)(?!.*\\s).{4,}$')])
    })
  }

  onSubmit() {
    const login = this.signInForm.value.login;
    const password = this.signInForm.value.password;

    this.isLoading = true;
    this.authentication.signIn(login, password)
        .subscribe(() => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);

        }, errMessage => {
          this.snackBar.openSnackBar(errMessage)
          this.isLoading = false;
        })
    this.signInForm.reset();
  }

  onError(value: any, state?:boolean) {
    return this.authentication.getErrorMessage(value, state);
  }
}

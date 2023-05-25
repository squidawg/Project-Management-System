import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  isLoading = false;
  hide = true;
  error!:string;

  constructor(private authentication: AuthenticationService,
              private router: Router) {}
  ngOnInit() {
    this.signInForm = new FormGroup({
      'login': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\W)(?!.*\\s).{4,}$')])
    })
  }

  onSubmit() {
    const login = this.signInForm.value.login;
    const password = this.signInForm.value.password;

    this.isLoading = true;
    this.authentication.signIn(login, password)
        .subscribe(resData => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);

        }, errRes => {
          this.error = errRes.error.message;
          this.isLoading = false;
        })
    this.signInForm.reset();
  }

  onError(value: any, valueName: string) {
    return this.authentication.getErrorMessage(value, valueName);
  }
}

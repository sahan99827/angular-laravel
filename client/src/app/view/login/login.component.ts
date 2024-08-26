import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {JarwisService} from "../../Services/jarwis.service";
import {TokenService} from "../../Services/token.service";
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public form={
    email:null,
    password:null
  };
  public error=null;
  constructor(private jarwis:JarwisService,
              private token: TokenService,
              private router: Router,
              private  auth: AuthService) {  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  hide = true;

  onSubmit() {
   this.jarwis.login(this.form).subscribe(
     data=>this.handleResponse(data),
     error => this.handleError(error)
   );
  }
   handleError(error: { error: { error: null; }; }){
    this.error=error.error.error;
  }
  ngOnInit() {   }


   handleResponse(data: any) {
    this.token.handle(data.access_token);
     this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/home');
  }
}

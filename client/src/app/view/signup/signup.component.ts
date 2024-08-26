import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {JarwisService} from "../../Services/jarwis.service";
import {TokenService} from "../../Services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  public form={
    name:null,
    email:null,
    password:null,
    password_confirmation:null
  }
  public  error =  {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  };
constructor(private  Jarwis:JarwisService,
            private token: TokenService,
            private router: Router) {

}

  // email = new FormControl('', [ Validators.required, Validators.email]);
  // name = new FormControl('', [  Validators.required]);

  hide = true;
  hide2 = true;
  private angular: any;
  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      data=>this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleError(error: { error : { errors: []; }; }){
      Object.keys(error.error.errors).forEach(key => {
      // @ts-ignore
      this.error[key] = error.error.errors[key];
    });
  }

  handleResponse(data: any) {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }
  ngOnInit() {
  }

}


//   getErrorMessage() {
//     if (this.email.hasError('required')) {
//       return 'You must enter a value';
//     }else{
//       return this.email.hasError('email') ? 'Not a valid email' : '';
//     }
//
//
//   }
// getMessage() {
//   if (this.name.hasError('required')) {
//     return 'You must enter a value';
//   } else {
//     return this.name.hasError('name') ? 'Not a valid name' : '';
//   }
// }

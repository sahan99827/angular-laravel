import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {JarwisService} from "../../../Services/jarwis.service";
import {ToastContainerDirective, ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss'],
  template: `
    <h1><a (click)="handleResponse()">Okay </a></h1>
    <div aria-live="polite" toastContainer></div>
  `,
})
export class ResponseResetComponent implements OnInit{
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective | undefined;


  public form = {
    email:null,
    password:null,
    password_confirmation:null,
    resetToken:null
  }
  public  error =  {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  };

  constructor(
    private route:ActivatedRoute,
    private jaravis:JarwisService,
    private router:Router,
    private toastr: ToastrService,

  ) {
    route.queryParams.subscribe(params =>{
    this.form.resetToken = params['token']
  });   }
  email = new FormControl('', [ Validators.required, Validators.email]);
  name = new FormControl('', [  Validators.required,
                                                  Validators.minLength(3),
                                                  Validators.maxLength(255),
                                                  Validators.pattern("^[A-Z][a-z]{2,}.[\\s][A-Z][a-z]{2,}$"),]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    } else {
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
  }
    onSubmit() {
    this.jaravis.changePassword(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error),
    )
  }
  handleResponse(data:any){
    this.toastr.success('Done!, Now login with new Password')
    this.router.navigateByUrl('/login');
  }
  handleError(error: { error : { errors: []; } }){
    Object.keys(error.error.errors).forEach(key => {
      // @ts-ignore
      this.error[key] = error.error.errors[key];
    });
  }

  hide = true;
  hide2 = true;
  ngOnInit() {    this.toastr.overlayContainer = this.toastContainer; }

}

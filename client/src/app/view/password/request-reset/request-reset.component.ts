import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {JarwisService} from "../../../Services/jarwis.service";
import {ToastrService} from "ngx-toastr";
import {timeout} from "rxjs";

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {


  public form = {
    email: null,

  };

  public error = null;
  constructor(private jarvis:JarwisService,
              private toastr: ToastrService
  ) {
  }

  email = new FormControl('', [Validators.required, Validators.email]);



  ngOnInit() {
  }
  onSubmit(){
    // @ts-ignore
    this.toastr.info('wait.........');
    this.jarvis.sendPasswordResetLink(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>this.toastr.error(error.error.error)
    );
  }
  handleResponse(res:any){
    // @ts-ignore
    this.toastr.success(res.data);
    this.form.email=null;
  }
}

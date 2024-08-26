import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../Services/token.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  public loggedIn : boolean | undefined;

  constructor(
    private auth:AuthService,
    private router:Router,
    private tokan: TokenService
  ) { }
  ngOnInit() {
    this.auth.authStatus.subscribe(value => this.loggedIn =value);
  }
  logout(event:MouseEvent){
    event.preventDefault();
    this.tokan.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}

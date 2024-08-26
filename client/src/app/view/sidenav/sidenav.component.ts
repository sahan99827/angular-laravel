import {Component, OnInit} from '@angular/core';
import {SidenavService} from "../../Services/sidenav.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  constructor(public navService:SidenavService) {}

  isSideNavOpen: boolean = false;


  ngOnInit(): void {
    // @ts-ignore
    this.navService.getSideNavState().subscribe((state: boolean) => {
      this.isSideNavOpen = state;
      event?.preventDefault()

    });
  }
}

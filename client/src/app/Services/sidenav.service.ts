import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Breakpoints} from "@angular/cdk/layout";
import {ViewportRuler} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class SidenavService implements OnInit{

  private isSideNavOpen: boolean = false;
constructor(private viewportRuler: ViewportRuler) {
}
  toggleSideNav(): void {
    this.isSideNavOpen = !this.isSideNavOpen;
  }
  deviceWidth=0;
  ngOnInit(): void {
    this.deviceWidth =  this.getDeviceWidth();
    console.log('Device width:', this.deviceWidth);
  }
  getDeviceWidth(){
    const viewportSize = this.viewportRuler.getViewportSize();
   return  viewportSize.width;
  }
  getSideNavState(): boolean {

    let sidenav=false;
    if (this.deviceWidth<960){
     sidenav=  this.isSideNavOpen;

    }
    return sidenav;
  }

setSideNavState(){
    this.isSideNavOpen=false;
}

//   setMenuState(): boolean{
//
//   let isMenuVisible=false;
//   if (this.deviceWidth<960){
//     isMenuVisible=  true;
//   }
//     return isMenuVisible;
// }
}

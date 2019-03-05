import { Component, Input, OnInit } from '@angular/core';
import { navItems } from '../../common/variables/menu_lateral';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
//import { navItems } from './../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{

  //public navItems = navItems;
  public navItems= navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(
    private router:Router,
    public authService: AuthService
    ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
  ngOnInit(): void {
    /* console.log("auth-veirfication",localStorage.getItem('isLoggedIn'));
    if(localStorage.getItem('isLoggedIn') == "false"){
      console.log("no auth");
      this.authService.logout();
      this.router.navigate(['/login']);
    } */
  }
  logout(){
    console.log("logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

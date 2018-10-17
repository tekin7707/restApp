import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { User } from '../../model/User';
import { Picture } from '../../model/Picture';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css'],
  providers:[ToolService]
})
export class LoggedComponent implements DoCheck {
  @ViewChild('navbarToggler') navbarToggler:ElementRef;
  isLogged = false;
  loggedUser :User;
  picture : Picture;
    constructor(
    private loginService: LoginService,
    private toolService:ToolService,
    private router: Router
  ) { 
    this.loggedUser=this.loginService.getLoginUser();
    if(this.loggedUser)
    this.toolService.getUserPicture(this.loggedUser.id).subscribe(x=>{
      this.picture=x;
    });
  }
  ngDoCheck() {
    this.isLogged = this.loginService.isLoggedIn();
    // console.log("doCheck-->"+this.isLogged);
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl("main");
  }
  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }  
}

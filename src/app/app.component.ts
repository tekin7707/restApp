import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {""
  title = 'app';
  public options={
    timeOut:1000,
    position:["bottom","right"],
    lastOnBottom:true
  }

  isLoggedIn = false;
  constructor(private loginService: LoginService) { }  

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
  }
}

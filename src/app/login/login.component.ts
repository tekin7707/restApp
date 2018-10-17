import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl:string;
  message:string;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private loginService:LoginService) { 
    }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.returnUrl = params["returnUrl"] || "main";
      // this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'] || '/';
      // console.log("----> login.component ngOnInit : "+this.returnUrl);
    });
    }

  login(form:NgForm){
    
    this.loginService.login(form.value.email,form.value.password).subscribe(t=>{
      if(t){
        // console.log("login component true");
        this.router.navigateByUrl(this.returnUrl);
      }
      else{
        console.log("login component false");
        this.message="Username or Password is incorrect!";
      }
    });
  }
}

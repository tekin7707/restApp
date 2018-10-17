import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {} 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      /*Begin */
      let _login=this.loginService.isLoggedIn();
      // console.log("canactivate ----> "+_login);
      if (_login) {
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
     }
      /*End*/
  }
  canActivateChild(
      childRoute: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      /*Begin */
        return true;    
      /*End*/
  }
}

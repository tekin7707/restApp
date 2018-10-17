import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../login/login.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {} 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      /*Begin */
      let _admin=this.loginService.getLoginCategory()==1;
      // console.log("AdminGuard canactivate ----> "+_admin);
      if (_admin) {
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;

      }
    }
      /*End*/
}

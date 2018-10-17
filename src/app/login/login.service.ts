import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/User';
import { Company } from '../../model/Company';
import { NewRecord } from '../../model/new_record';

@Injectable()
export class LoginService {

  constructor(@Inject('restUrl') private restUrl, private http: Http) { }
  loggedIn = false;
  adminIn = false;
  loginCategory = 0;

  getLoginUser():User{
    let temp = localStorage.getItem('mtAuth');
    if (temp) {
      let userStroge = JSON.parse(localStorage.getItem('mtAuth')) as User;
      return userStroge;
    }
    else return null;
  }

  getRequestOptions():RequestOptions{
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.getLoginUser().token);
    return new RequestOptions({ headers: headers });
  }
  
  getLoginCategory(){
    /*** -1:SystemUser 0: No Login  1:Admin >0: User  */
    let temp = localStorage.getItem('mtAuth');
    if (temp) {
      let userStroge = JSON.parse(localStorage.getItem('mtAuth')) as User;
      this.loginCategory = userStroge.role_id;
      if (userStroge.company_id==1) this.loginCategory=-1;
    }
    else {
      this.loginCategory = 0;
    }
    return this.loginCategory;
  }

  isLoggedIn() {
    let temp = localStorage.getItem('mtAuth');
    if (temp) {
      let userStroge = JSON.parse(localStorage.getItem('mtAuth')) as User;
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
    // console.log("loginService isLoggedIn :" + this.loggedIn);
    return this.loggedIn;
  }
  
  login(username, password): Observable<boolean> {
    let user = new User();
    user.email = username;
    user.password = password;

    let url: string = this.restUrl + "/user/login";
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    var requestOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, JSON.stringify(user), requestOptions)
      .map(res => res.json())
      .map(res => {
        if (res) {//res true ise
          localStorage.setItem("mtAuth", JSON.stringify(res));
          this.loggedIn = true;
          console.log("loginService http.post true");
          console.log(res);
          
          return true;
        }
        else {
          console.log("loginService http.post false");
          return false;
        }
      });
  }
  
  logout() {
    localStorage.removeItem('mtAuth');
    console.log("loginService logout");
    this.loggedIn = false;
  }

  private _serverError(err: any) {
    console.log('sever error:', err);  // debug
    if (err instanceof Response) {
      return Observable.throw(err.json() || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }
}

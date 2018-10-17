import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { User } from '../../model/User';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Role } from '../../model/Role';
import { LoginService } from '../login/login.service';

@Injectable()
export class UserService {

  users: User[];
  roles: Role[];
  loggedUser: User;
  constructor(
    private http: Http,
    private loginService: LoginService,
    @Inject("restUrl") private restUrl
  ) {
    this.loggedUser = loginService.getLoginUser();
  }

  getUsers(cid?: number): Observable<User[]> {
    let url = this.restUrl + "/User/GetAll";
    url += cid ? "/"+cid : "";
    return this.http.get(url,this.loginService.getRequestOptions()).map(x => x.json());
  }

  getUser(id: number): Observable<User> {
    let url = this.restUrl + "/User/Get/"+id;
    return this.http.get(url,this.loginService.getRequestOptions()).map(x => x.json());
  }

  getRoles(): Observable<Role[]> {
    let url = this.restUrl + "/Role/GetAll";
    return this.http.get(url,this.loginService.getRequestOptions()).map(x => x.json());
  }  

    createOrUpdate(u: User): Observable<User> {
    let url = this.restUrl;
    url += (u.id > 0) ? "/User/Update" : "/User/Add";
    return this.http.post(url, JSON.stringify(u),this.loginService.getRequestOptions()).map(x => x.json());
  }

  delete(id) {
    if (id) {
      let url = this.restUrl + "/User/Delete/" + id;
      return this.http.delete(url, this.loginService.getRequestOptions()).map(res => { });
    }
  }

}

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Company } from '../../model/Company';
import { LoginService } from '../login/login.service';
import { User } from '../../model/User';
import { NewRecord } from '../../model/new_record';

@Injectable()
export class CompanyService {
  company: any;
  loggedUser: User;
  constructor(
    private http: Http,
    private loginService: LoginService,
    @Inject("restUrl") private restUrl
  ) {
    this.loggedUser = loginService.getLoginUser();
  }

  getCompany(Id?: number): Observable<Company[]> {

    console.log(this.loggedUser);


    let a= new Date(this.loggedUser.date);
    console.log(a);
    console.log(a.getFullYear());
    console.log(a.getMonth()+1);
    console.log(a.getDate());
    console.log(a.getHours());
    console.log(a.getMinutes());
    console.log(a.getSeconds());
    console.log(a.toLocaleDateString());
    console.log(a.toDateString());

  

    let url = this.restUrl + "/Company/GetAll/";
    if (Id) {
      url += Id;
    }
    // return this.http.get(url, {
    //   headers: new Headers({"Authorization": "Bearer " + tokenString,"Content-Type": "application/json"})
    // }).map(res => res.json());    



    // return this.http.get(url, {
    //   headers: new Headers({"Authorization": "Bearer " + tokenString,"Content-Type": "application/json"})
    // }).map(res => res.json()).map(res=>{
    //   if(res){
    //       return res;
    //   }
    //   else{
    //     console.log("hata 3");
    //     return null;
    //   }
    // });    


    // return this.http.get(url, {
    //   headers: new Headers({"Authorization": "Bearer " + this.loggedUser.token,"Content-Type": "application/json"})
    // }).map(res => res.json())  
    // .catch(this._serverError);   
console.log(url);

    return this.http.get(url, this.loginService.getRequestOptions()).map(res => res.json())
      .catch(this._serverError);
  }

  private _serverError(err: any) {
    console.log('sever error:', err);  // debug
    if (err instanceof Response) {
      return Observable.throw(err.json() || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }

  updateCompany(c: Company) {
    let url = this.restUrl + "/Company/Update";
    console.log(c);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => { })
    // .catch(this._serverError);
    .catch(this._serverError);
  }

  setCompany(c: Company): Observable<Company> {
    let url = this.restUrl + "/Company/Add";
    console.log(c);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => res.json())
    .catch(this._serverError);
  }

  delCompany(id) {
    let url = this.restUrl + "/Company/Delete/" + id;
    console.log(url);
    return this.http.delete(url, this.loginService.getRequestOptions()).map(res => { })
    .catch(this._serverError);
  }
}
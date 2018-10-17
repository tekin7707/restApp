import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Customer } from '../../model/Customer';
import { User } from '../../model/User';
import { LoginService } from '../login/login.service';

@Injectable()
export class CustomerService {
  loggedUser: User;
  constructor(
    private http: Http,
    private loginService: LoginService,
    @Inject("restUrl") private restUrl
  ) {
    this.loggedUser = loginService.getLoginUser();
  }

  getCustomers(cid?: number): Observable<Customer[]> {
    let url = this.restUrl + "/Customer/GetAll";
    url += cid ? "/"+cid : "";
    console.log(url);
    return this.http.get(url, this.loginService.getRequestOptions()).map(x => x.json());
  }

  getCustomer(id: number): Observable<Customer> {
    let url = this.restUrl + "/Customer/Get/" + id;
    return this.http.get(url, this.loginService.getRequestOptions()).map(x => x.json());
  }

  addCustomer(c: Customer): Observable<Customer> {
    let url = this.restUrl + "/Customer/Add";
    console.log(c);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => res.json());
  }

  updateCustomer(c: Customer) {
    let url = this.restUrl + "/Customer/Update";
    console.log(c);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => { });
  }

  delCustomer(id) {
    let url = this.restUrl + "/Customer/Delete/" + id;
    console.log(url);

    return this.http.delete(url, this.loginService.getRequestOptions()).map(res => { });
  }


}

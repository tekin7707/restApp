import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '../../../node_modules/@angular/http';
import { Observable } from '../../../node_modules/rxjs';
import { MovementType } from '../../model/MovementType';
import { User } from '../../model/User';
import { LoginService } from '../login/login.service';

@Injectable()
export class TanimService {
  loggedUser: User;
  constructor(
    private http: Http,
    private loginService: LoginService,
    @Inject("restUrl") private restUrl
  ) {
    this.loggedUser = loginService.getLoginUser();
  }

  delete(id: number, table: string) {
    let url = this.restUrl + "/" + table + "/Delete/" + id;
    console.log(url);
    return this.http.delete(url, this.loginService.getRequestOptions()).map(res => { });
  }

  getMovementTypes(cid?: number): Observable<MovementType[]> {
    let url = this.restUrl + "/MovementType/GetAll";
    url += cid ? "/" + cid : "";
    return this.http.get(url, this.loginService.getRequestOptions()).map(x => x.json());
  }

  getMovementType(id: number): Observable<MovementType> {
    let url = this.restUrl + "/MovementType/Get/" + id;
    return this.http.get(url, this.loginService.getRequestOptions()).map(x => x.json());
  }

  addMovementType(c: MovementType): Observable<MovementType> {
    let url = this.restUrl + "/MovementType/Add";
    console.log(c);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => res.json());
  }

  updateMovementType(c: MovementType) {
    let url = this.restUrl + "/MovementType/Update";
    console.log(c);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => { });
  }
  deleteMovementType(id: number) {
    let url = this.restUrl + "MovementType/Delete/" + id;
    console.log(url);
    return this.http.delete(url, this.loginService.getRequestOptions()).map(res => { });
  }
}

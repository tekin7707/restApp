import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '../../../node_modules/@angular/http';
import { Observable } from '../../../node_modules/rxjs';
import { Movement_List, Movement_s } from '../../model/Movement';
import { User } from '../../model/User';
import { LoginService } from '../login/login.service';

@Injectable()
export class MovementService {
  loggedUser: User;
  constructor(
    private http: Http,
    private loginService: LoginService,
    @Inject("restUrl") private restUrl
  ) {
    this.loggedUser = loginService.getLoginUser();
  }

  getMovementList(cid?:number):Observable<Movement_List[]>{
    let url= this.restUrl+"/movement/getAll";
    url += cid ? "/"+cid : "";
    return this.http.get(url, this.loginService.getRequestOptions()).map(x=>x.json());
  }

  getMovement(id:number):Observable<Movement_s>{
    let url= this.restUrl+"/movement/get/"+id;
    return this.http.get(url, this.loginService.getRequestOptions()).map(x=>x.json());
  }

  setDate(d:Date):Date{
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()))
   } 

  addMovement(c: Movement_s): Observable<Movement_s> {
    let url = this.restUrl + "/Movement/Add";
    console.log("service addMovement");
    console.log(c);
    c.movement.date = this.setDate(c.movement.date);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => res.json());
  }  

  updateMovement(c: Movement_s){
    let url = this.restUrl + "/Movement/Update";
    console.log(c);
    c.movement.date = this.setDate(c.movement.date);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => {});
  }   

  deleteMovement(id: number, table: string) {
    let url = this.restUrl + "/"+table+"/Delete/" + id;
    console.log(url);
    return this.http.delete(url, this.loginService.getRequestOptions()).map(res => { });
  }

}

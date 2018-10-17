import { Injectable, Inject } from '@angular/core';
import { RequestOptions, Http,Headers } from '../../../node_modules/@angular/http';
import { Observable } from '../../../node_modules/rxjs';
import { Picture } from '../../model/Picture';
import { User } from '../../model/User';
import { LoginService } from '../login/login.service';

@Injectable()
export class ToolService {

  loggedUser: User;
  constructor(
    private http: Http,
    private loginService: LoginService,
    @Inject("restUrl") private restUrl
  ) {
    this.loggedUser = loginService.getLoginUser();
  }

  upload(fileToUpload: any, match_id: number, table: string):Observable<Picture[]> {
    let url = this.restUrl + "/home/upload";
    let input = new FormData();
    input.append("file", fileToUpload);
    input.append("table", table);
    input.append("match_id", match_id+"");
    return this.http.post(url, input).map(res => res.json());
  } 

  getUserPicture(id:number):Observable<Picture> {
    let url = this.restUrl + "/User/GetUserPicture/" + id;
    console.log(url);
    return this.http.get(url,this.loginService.getRequestOptions()).map(x => x.json());
  }  

  deletePicture(id) {
    let url = this.restUrl + "/Home/DeletePicture/" + id;
    console.log(url);
    return this.http.delete(url, this.loginService.getRequestOptions()).map(res => { });
  }  

}

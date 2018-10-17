import { Injectable, Inject } from '@angular/core';
import { Http,Headers, RequestOptions } from '../../../node_modules/@angular/http';
import { Product_s } from '../../model/product_s';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Product } from '../../model/Product';
import { Category } from '../../model/Category';
import { Vat } from '../../model/Vat';
import { Picture } from '../../model/Picture';
import { User } from '../../model/User';
import { LoginService } from '../login/login.service';

@Injectable()
export class ProductService {
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

  deletePicture(id) {
    let url = this.restUrl + "/Home/DeletePicture/" + id;
    console.log(url);
    return this.http.delete(url, this.loginService.getRequestOptions()).map(res => { });
  }  

  getProducts(cid?: number): Observable<Product[]> {
    let url = this.restUrl + "/Product/GetAll";
    url += cid ? "/"+cid : "";
    return this.http.get(url, this.loginService.getRequestOptions()).map(x => x.json());
  }

  getCategories(cid?: number): Observable<Category[]> {
    let url = this.restUrl + "/Category/GetAll";
    url += cid ? "/"+cid : "";
    return this.http.get(url, this.loginService.getRequestOptions()).map(x => x.json());
  }

  getVats(): Observable<Vat[]> {
    let url = this.restUrl + "/Product/GetVats";
    return this.http.get(url, this.loginService.getRequestOptions()).map(x => x.json());
  }

  getProduct(id: number): Observable<Product_s> {
    let url = this.restUrl + "/Product/Get_s/"+id;
    return this.http.get(url, this.loginService.getRequestOptions()).map(x => x.json());
  }

  addProduct(c: Product_s): Observable<Product_s> {
    let url = this.restUrl + "/Product/Add_s";
    console.log(c);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => res.json());
  }  

  updateProduct(c: Product_s){
    let url = this.restUrl + "/Product/Update_s";
    console.log(c);
    console.log(JSON.stringify(c));
    return this.http.post(url, JSON.stringify(c), this.loginService.getRequestOptions()).map(res => {});
  }    

  delProduct(id) {
    let url = this.restUrl + "/Product/Delete/" + id;
    console.log(url);
    return this.http.delete(url, this.loginService.getRequestOptions()).map(res => { });
  }


}

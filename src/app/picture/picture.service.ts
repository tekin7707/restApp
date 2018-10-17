import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '../../../node_modules/@angular/http';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class PictureService {
  url = "";
  sendform: any = {};
  constructor(
    private http: Http,
    @Inject('restUrl') private restUrl
  ) { }

  upload(fileToUpload: any, match_id: string, table: string):Observable<boolean> {

    this.url = this.restUrl + "/home/upload";
    let input = new FormData();
    input.append("file", fileToUpload);
    input.append("table", "product");
    input.append("match_id", "123");
    return this.http.post(this.url, input).map(res => res.json());
  }
}

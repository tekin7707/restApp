import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '../../../node_modules/@angular/http';
import { Company } from '../../model/Company';
import { Observable } from '../../../node_modules/rxjs';
import { NewRecord } from '../../model/new_record';

@Injectable()
export class BasicService {

  constructor(
    private http: Http,
    @Inject("restUrl") private restUrl

  ) { }

  register(c: Company): Observable<NewRecord> {
    let url = this.restUrl + "/Home/Register";
    console.log(url);
    console.log(JSON.stringify(c));

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let ro = new RequestOptions({ headers: headers });
    return this.http.post(url, JSON.stringify(c),ro ).map(res => res.json())
  }

}

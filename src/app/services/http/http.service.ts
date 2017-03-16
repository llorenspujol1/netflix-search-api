/**
 * Created by Llorenç on 17/03/2016.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

    constructor(
      private _http: Http
    ) {

    }

    public request(path: string, config: RequestOptionsArgs): Observable<any> {
      //return this._http.get(path, config).map(res => res.json());

      return Observable.create(
        (observer: Observer<any>) => {
          this._http.get(path, config)
            .map(res => res.json())
            .subscribe(
              (data: any) => {
                observer.next(data);
                observer.complete();
              },
              (error: any) => {
                console.log('Error on request', error);
                observer.error(error);
              }
            )
        }
      )
    }

}


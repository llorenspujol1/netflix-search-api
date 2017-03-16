import { Injectable } from '@angular/core';
import { RequestOptionsArgs, RequestMethod } from '@angular/http';

import { Observable, Observer } from 'Rxjs';

import { HttpService } from '../http/http.service';

// entities
import { NetflixApiResponse } from './netflix.entities'

@Injectable()
export class NetflixService {

  path: string = "http://netflixroulette.net/api/api.php?"
  config: RequestOptionsArgs;

  constructor(
    private httpService: HttpService
  ) {
    this.config = {
      method: RequestMethod.Get
    }
  }

  /**
   * Searches by title, director and actor all together
   * @param  {string} value
   * @returns Observable
   */
  public searchAll(value: string): Observable<Array<NetflixApiResponse>> {
    return Observable.zip(
      this.searchTitle(value),
      this.searchDirector(value),
      this.searchActor(value),
      (title, directorArr, actorArr) => {
        let response: Array<NetflixApiResponse> = new Array();
        if(title) {response.push(title)};
        if(directorArr) {response = response.concat(directorArr)};
        if(actorArr) {response = response.concat(actorArr)};
        return response;
      }
    );
  }

  /**
   * Searches into netflix api by title, this Observable returned  never goes to error
   * @param  {string} value
   * @returns Observable
   */
  public searchTitle(value: string): Observable<NetflixApiResponse> {
    return this.httpService.request(this.path + 'title=' + value, this.config)
    .catch(e => {return Observable.of(undefined)});
  }

  /**
   * Searches into netflix api by director, this Observable returned never goes to error
   * @param  {string} value
   * @returns Observable
   */
  public searchDirector(value: string): Observable<Array<NetflixApiResponse>> {
    return this.httpService.request(this.path + 'director=' + value, this.config)
    .catch(e => {return Observable.of([])});
  }

  /**
   * Searches into netflix api by actor, this Observable returned never goes to error
   * @param  {string} value
   * @returns Observable
   */
  public searchActor(value: string): Observable<Array<NetflixApiResponse>> {
    return this.httpService.request(this.path + 'actor=' + value, this.config)
    .catch(e => {return Observable.of([])});

  }
}

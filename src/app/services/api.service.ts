import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, timeout, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const apiTimeout = 20 * 60 * 1000; // 10 minutes timeout

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _isLoggedOut = new Subject();

  constructor(private http: HttpClient) {}

  public logOutSub() {
    return this._isLoggedOut.asObservable();
  }

  private checkLogin(res) {
    if (res && res.status === 'logout') {
      this._isLoggedOut.next(true);
    }
  }

  /**
   * This function sets header and returns
   * @returns HttpHeaders
   */
  private setHeaders(type = 'any'): HttpHeaders {
    let headersConfig = {};
    if (type === 'upload' || type === 'formData') {
    } else {
      headersConfig = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };
    }
    return new HttpHeaders(headersConfig);
  }

  /**
   * This function makes get call to api to given path and search params
   * @param path string
   * @param params SearchParams
   * @param extras {operation: '', result: {}} name of the operation that failed
   *  for error logging and optional value to return as the observable result
   * @returns Observable
   */
  get(
    path: string,
    params = {},
    extras = {
      operation: '',
      result: {}
    }
  ): Observable<any> {
    const options = {
      params: params,
      headers: this.setHeaders()
    };

    const targetUrl = `${environment.api_url}${path}`;

    return this.http.get(targetUrl, options).pipe(
      timeout(apiTimeout),
      tap(res => this.checkLogin(res)),
      catchError(this.handleError(extras.operation, extras.result))
    );
  }

  /**
   * This function makes post call to api to given path and search params
   * @param path string
   * @param params SearchParams
   * @param extras {operation: '', result: {}} name of the operation that failed
   *  for error logging and optional value to return as the observable result
   * @returns Observable
   */

  post(
    path: string,
    params,
    type = 'any',
    extras = {
      operation: '',
      result: {}
    }
  ): Observable<any> {
    const targetUrl = `${environment.api_url}${path}`;
    const options = {
      headers: this.setHeaders(type)
    };
    let postParams: any = params;
    if (type === 'formdata') {
      postParams = new FormData();
      for (const key of Object.keys(params)) {
        postParams.set(key, params[key]);
      }
    }

    return this.http.post(targetUrl, postParams, options).pipe(
      timeout(apiTimeout),
      tap(res => this.checkLogin(res)),
      catchError(this.handleError(extras.operation, extras.result))
    );
  }
  upload(
    path: string,
    params,
    type = 'upload',
    extras = {
      operation: '',
      result: {}
    }
  ): Observable<any> {
    const targetUrl = `${environment.api_url}${path}`;
    const options = {
      headers: this.setHeaders(type)
    };
    return this.http.post(targetUrl, params, options).pipe(
      timeout(apiTimeout),
      catchError(this.handleError(extras.operation, extras.result))
    );
  }

  postFormData(
    path: string,
    params,
    type = 'formData',
    extras = {
      operation: '',
      result: {}
    }
  ): Observable<any> {
    const targetUrl = `${environment.api_url}${path}`;
    const options = {
      headers: this.setHeaders(type)
    };
    return this.http.post(targetUrl, params, options).pipe(
      timeout(apiTimeout),
      tap(res => this.checkLogin(res)),
      catchError(this.handleError(extras.operation, extras.result))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

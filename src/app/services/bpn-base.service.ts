import { throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { tap, catchError, map } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';


@Injectable({
  providedIn: 'root'
}) 
export class BpnBaseService {
  constructor(private _http: HttpClient, private _loaderService: LoaderService, private _errorService: ErrorService) { }


  protected get = (url: string): Observable<any> => {
    this._loaderService.displayLoader(true);
    return this._http.get(url)
      .pipe(
        tap(() => this._loaderService.displayLoader(false)),
        catchError(this.handleError)
      );
  }

  protected post = (url: string, data: any): Observable<any> => {
    const body = data;
    // const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    const options = {
      headers: headers
    };
    this._loaderService.displayLoader(true);
    return this._http.post(url, body, options)
    .pipe(
      tap(() => this._loaderService.displayLoader(false)),
      catchError(this.handleError)
    );

  }

  private handleError = (errorResponse: Response) => {
    this._loaderService.displayLoader(false);
    return observableThrowError('Server error');
  }

  
}

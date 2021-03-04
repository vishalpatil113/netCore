import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service'
import { ErrorService } from './error.service';
import { timeout, tap, catchError } from 'rxjs/operators';


@Injectable()
export class BaseService {
  constructor(private _http: HttpClient, private _loaderService: LoaderService, private _errorService: ErrorService) { }


  protected get = (url: string): Observable<any> => {

    this._loaderService.displayLoader(true);
    return this._http.get(url)
      .pipe(
        timeout(1500000),
        tap(() => this._loaderService.displayLoader(false)),
        catchError(this.handleError)
      );
  }

  protected post = (url: string, data: any): Observable<any> => {
    if (data && data.clientId) {
      data.clientId = String(data.clientId);
    }
    const body = data;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = {
      headers: headers
    };
    this._loaderService.displayLoader(true);
    return this._http.post(url, body, options)
      .pipe(
        timeout(1500000),
        tap(() => this._loaderService.displayLoader(false)),
        catchError(this.handleError)
      );
  }

  private handleError = (errorResponse: any) => {
    // if (errorResponse.status == 404) {
    //   this._errorService.showErrorMessage("Page not found");
    // }
    // else
      // if (errorResponse._body) {
      //   this._errorService.showErrorMessage(errorResponse._body);
      // }
      // else
      //  {
      //   this._errorService.showErrorMessage(errorResponse.message);
      // }
    this._loaderService.displayLoader(false);
    return [];
  }
}

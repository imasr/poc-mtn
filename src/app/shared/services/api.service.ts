import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(public http: HttpClient) {}

  getAuthHeaders(options: {
    responseType?: string;
    headers: any;
    params?: any;
  }): any {
    const httpOptions: any = {};
    if (options?.headers) {
      httpOptions.headers = new HttpHeaders(options?.headers);
    }
    if (options?.params) {
      httpOptions.headers = new HttpParams(options?.params);
    }
    if (options?.responseType) {
      httpOptions.responseType = options?.responseType;
    }

    return httpOptions;
  }

  processApiResponse<T>() {
    return (httpResponse$: Observable<any>) =>
      httpResponse$.pipe(
        map((response) => response as T),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  get<T>(endpoint: string, options?: any): Promise<any> {
    return this.http
      .get(endpoint, this.getAuthHeaders(options))
      .pipe(this.processApiResponse())
      .toPromise();
  }

  post<T>(endpoint: string, body: any, options?: any): Promise<any> {
    return this.http
      .post(endpoint, body, this.getAuthHeaders(options))
      .pipe(this.processApiResponse())
      .toPromise();
  }
}

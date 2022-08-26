import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(public http: HttpClient) {}

  processApiResponse<T>() {
    return (httpResponse$: Observable<any>) =>
      httpResponse$.pipe(
        map((response) => response as T),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  get<T>(endpoint: string): Observable<any> {
    return this.http.get(endpoint).pipe(this.processApiResponse());
  }
}

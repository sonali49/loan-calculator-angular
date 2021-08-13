import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoanCalculator } from '../loanCalculator';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
     'X-API-KEY': 'swb-222222',
  }),
};

@Injectable({ providedIn: 'root' })
export class LoanCalculatorService {
  loanSubmitUrl = 'https://homework.fdp.workers.dev/';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError(
      'LoanCalculatorService'
    );
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }

  submitLoan(loanCalculator: LoanCalculator): Observable<LoanCalculator> {
    return this.http
      .post<LoanCalculator>(this.loanSubmitUrl, loanCalculator, httpOptions)
      .pipe(
        tap(() => console.log('I am SUCCESSSS')),
        catchError(
          this.handleError('submitLoan', loanCalculator)
        )
      );
  }
}
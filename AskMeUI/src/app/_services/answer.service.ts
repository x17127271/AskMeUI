import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IAnswer } from '../_models/answer';

import { AuthenticationService } from '../_services/authentication.service';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AnswerService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  currentUser = this.authenticationService.currentUserValue;
  private apiBaseUrl = 'http://localhost:51044/api';

  getAnswers(questionId: number): Observable<IAnswer[]> {
    return this.http
      .get<IAnswer[]>(`${this.apiBaseUrl}/questions/${questionId}/answers`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAnswerById(answerId: number, questionId: number): Observable<IAnswer> {
    return this.http
      .get<IAnswer>(
        `${this.apiBaseUrl}/questions/${questionId}/answers/${answerId}`
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  createAnswer(answer: IAnswer) {
    return this.http
      .post(`${this.apiBaseUrl}/questions/${answer.questionId}/answers`, answer)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateAnswer(answer: IAnswer) {
    return this.http
      .put(
        `${this.apiBaseUrl}/questions/${answer.questionId}/answers/${answer.id}`,
        answer
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(answerId: number, questionId: number) {
    return this.http.delete(
      `${this.apiBaseUrl}/questions/${questionId}/answers/${answerId}`
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error ocurred: ' + err.error.message;
    } else {
      errorMessage =
        'Server returned code: ' +
        err.status +
        ', error message is: ' +
        err.message;
    }
    console.error(errorMessage);

    return throwError(errorMessage);
  }
}

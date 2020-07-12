import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IQuestion } from '../_models/question';

import { AuthenticationService } from '../_services/authentication.service';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  currentUser = this.authenticationService.currentUserValue;
  private apiBaseUrl = 'http://localhost:51044/api';

  getQuestions(lessonId: number): Observable<IQuestion[]> {
    return this.http
      .get<IQuestion[]>(`${this.apiBaseUrl}/lessons/${lessonId}/questions`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getQuestionById(questionId: number): Observable<IQuestion> {
    return this.http
      .get<IQuestion>(`${this.apiBaseUrl}/lessons/${1}/questions/${questionId}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createQuestion(question: IQuestion) {
    return this.http
      .post(
        `${this.apiBaseUrl}/lessons/${question.lessonId}/questions`,
        question
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(questionId: number, lessonId: number) {
    return this.http.delete(
      `${this.apiBaseUrl}lessons/${lessonId}/questions/${questionId}`
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

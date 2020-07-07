import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IQuestion } from '../_models/question';

import { AuthenticationService } from '../_services/authentication.service';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      .pipe(catchError(this.handleError));
  }

  getLessonById(questionId: number): Observable<IQuestion> {
    return this.http
      .get<IQuestion>(`${this.apiBaseUrl}/lessons/${1}/question/${questionId}`)
      .pipe(catchError(this.handleError));
  }

  createQuestion(question: IQuestion) {
    // to be changed
    question.lessonId = 1;
    return this.http.post(
      `${this.apiBaseUrl}/lessons/${question.lessonId}/questions`,
      question
    );
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

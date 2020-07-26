import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IExam } from '../_models/exam';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class ExamService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  private apiBaseUrl = 'http://localhost:51044/api';

  currentUser = this.authenticationService.currentUserValue;

  getExams(): Observable<IExam[]> {
    return this.http
      .get<IExam[]>(`${this.apiBaseUrl}/users/${this.currentUser.id}/exams`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getExamById(examId: number): Observable<IExam> {
    return this.http
      .get<IExam>(
        `${this.apiBaseUrl}/users/${this.currentUser.id}/exams/${examId}`
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getExamQuestions(examId: number): Observable<any> {
    return this.http
      .get<any[]>(
        `${this.apiBaseUrl}/users/${this.currentUser.id}/exams/${examId}/questions`
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  createExamQuestions(exam: IExam) {
    exam.userId = this.currentUser.id;
    return this.http
      .post(`${this.apiBaseUrl}/users/${exam.userId}/exams`, exam)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(examId: number) {
    return this.http.delete(
      `${this.apiBaseUrl}/users/${this.currentUser.id}/exams/${examId}`
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

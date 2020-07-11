import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IExam } from '../_models/exam';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ExamService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = 'http://localhost:51044/api';

  getExams(userId: number): Observable<IExam[]> {
    return this.http
      .get<IExam[]>(`${this.apiBaseUrl}/users/${userId}/exams`)
      .pipe(catchError(this.handleError));
  }

  getExamById(examId: number): Observable<IExam> {
    return this.http
      .get<IExam>(`${this.apiBaseUrl}/users/${1}/exams/${examId}`)
      .pipe(catchError(this.handleError));
  }

  getExamQuestions(userId: number): Observable<any> {
    const examId = 1;
    return this.http
      .get<any[]>(
        `${this.apiBaseUrl}/users/${userId}/exams/${examId}/questions`
      )
      .pipe(catchError(this.handleError));
  }

  createExamQuestions(exam: IExam) {
    // to be changed
    exam.userId = 1;
    exam.questions = [1, 2, 3];
    return this.http.post(
      `${this.apiBaseUrl}/users/${exam.userId}/exams`,
      exam
    );
  }

  delete(examId: number, userId: number) {
    return this.http.delete(
      `${this.apiBaseUrl}/users/${userId}/exams/${examId}`
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

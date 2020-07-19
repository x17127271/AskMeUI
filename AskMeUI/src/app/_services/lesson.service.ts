import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ILesson } from '../_models/lesson';

import { AuthenticationService } from '../_services/authentication.service';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LessonService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  currentUser = this.authenticationService.currentUserValue;
  private apiBaseUrl = 'http://localhost:51044/api';

  getLessons(subjectId: number): Observable<ILesson[]> {
    return this.http
      .get<ILesson[]>(`${this.apiBaseUrl}/subjects/${subjectId}/lessons`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getLessonById(lessonId: number): Observable<ILesson> {
    return this.http
      .get<ILesson>(`${this.apiBaseUrl}/subjects/${1}/lessons/${lessonId}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createLesson(lesson: ILesson) {
    return this.http
      .post(`${this.apiBaseUrl}/subjects/${lesson.subjectId}/lessons`, lesson)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateLessonById(lesson: ILesson) {
    return this.http
      .put(`${this.apiBaseUrl}/subjects/${1}/lessons/${lesson.id}`, lesson)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(lessonId: number, subjectId: number) {
    return this.http.delete(
      `${this.apiBaseUrl}subjects/${subjectId}/lessons/${lessonId}`
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

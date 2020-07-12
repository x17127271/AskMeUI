import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ISubject } from '../_models/subject';

import { AuthenticationService } from '../_services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  currentUser = this.authenticationService.currentUserValue;
  private apiBaseUrl = 'http://localhost:51044/api';

  getSubjects(): Observable<ISubject[]> {
    return this.http
      .get<ISubject[]>(
        `${this.apiBaseUrl}/users/${this.currentUser.id}/subjects`
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getSubjectById(subjectId: number): Observable<ISubject> {
    return this.http
      .get<ISubject>(
        `${this.apiBaseUrl}/users/${this.currentUser.id}/subjects/${subjectId}`
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  createSubject(subject: ISubject) {
    subject.userId = this.currentUser.id;
    return this.http
      .post(`${this.apiBaseUrl}/users/${this.currentUser.id}/subjects`, subject)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete(`${this.apiBaseUrl}/subjects/${id}`);
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

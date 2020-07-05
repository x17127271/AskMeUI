import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from '../_models/subject';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  currentUser = this.authenticationService.currentUserValue;
  private apiBaseUrl = 'http://localhost:51044/api';
  getAll() {
    return this.http.get<Subject[]>(
      `${this.apiBaseUrl}/users/${this.currentUser.id}/subjects`
    );
  }

  createSubject(subject: Subject) {
    subject.userId = this.currentUser.id;
    return this.http.post(
      `${this.apiBaseUrl}/users/${this.currentUser.id}/subjects`,
      subject
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.apiBaseUrl}/subjects/${id}`);
  }
}

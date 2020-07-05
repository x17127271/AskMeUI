import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Lesson } from '../_models/lesson';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class LessonService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  currentUser = this.authenticationService.currentUserValue;
  private apiBaseUrl = 'http://localhost:51044/api';
  getAll(subjectId: number) {
    return this.http.get<Lesson[]>(
      `${this.apiBaseUrl}/subjects/${subjectId}/lessons`
    );
  }

  createLesson(lesson: Lesson) {
    // to be changed
    lesson.subjectId = 1;
    return this.http.post(
      `${this.apiBaseUrl}/subjects/${lesson.subjectId}/lessons`,
      lesson
    );
  }

  delete(lessonId: number, subjectId: number) {
    return this.http.delete(
      `${this.apiBaseUrl}subjects/${subjectId}/lessons/${lessonId}`
    );
  }
}

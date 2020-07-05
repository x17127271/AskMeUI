import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LessonService } from '../_services/lesson.service';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({ templateUrl: 'lesson.component.html' })
export class LessonComponent implements OnInit {
  currentUser: User;
  lessons = [];
  constructor(
    private authenticationService: AuthenticationService,
    private lessonService: LessonService
  ) {
    // this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllLessons();
  }

  private loadAllLessons() {
    this.lessonService
      // Get id from url
      .getAll(1)
      .pipe(first())
      .subscribe((lessons) => (this.lessons = lessons));
  }
}

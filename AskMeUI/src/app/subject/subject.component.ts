import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SubjectService } from '../_services/subject.service';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({ templateUrl: 'subject.component.html' })
export class SubjectComponent implements OnInit {
  currentUser: User;
  subjects = [];
  constructor(
    private authenticationService: AuthenticationService,
    private subjectService: SubjectService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllSubjects();
  }

  private loadAllSubjects() {
    this.subjectService
      .getAll()
      .pipe(first())
      .subscribe((subjects) => (this.subjects = subjects));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LessonService } from '../_services/lesson.service';
import { AlertService } from '../_services/alert.service';
import { SubjectService } from '../_services/subject.service';
import { ISubject } from '../_models/subject';
import { Subscription } from 'rxjs';

@Component({ templateUrl: 'lesson-create.component.html' })
export class LessonCreateComponent implements OnInit, OnDestroy {
  pageTitle = 'Create Lesson';
  lessonForm: FormGroup;
  loading = false;
  submitted = false;
  subjects: ISubject[];
  private subscription: Subscription;
  private subscriptionSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private alertService: AlertService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      subjectId: ['', Validators.required]
    });

    this.getSubjects();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.lessonForm.controls;
  }

  getSubjects(): void {
    this.subscriptionSub = this.subjectService
      .getSubjects()
      .subscribe((data) => {
        this.subjects = data;
      });
  }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.lessonForm.invalid) {
      return;
    }

    this.loading = true;
    this.subscription = this.lessonService
      .createLesson(this.lessonForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Lesson successful created', true);
          this.loading = false;
          this.router.navigate(['/lessons']);
        },
        (error) => {
          this.alertService.error('Lesson failed on creation.');
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionSub) {
      this.subscriptionSub.unsubscribe();
    }
  }
}

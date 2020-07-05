import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LessonService } from '../_services/lesson.service';
import { AlertService } from '../_services/alert.service';

@Component({ templateUrl: 'lesson-create.component.html' })
export class LessonCreateComponent implements OnInit {
  lessonForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.lessonForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.lessonForm.invalid) {
      return;
    }

    this.loading = true;
    this.lessonService
      .createLesson(this.lessonForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Lesson successful created', true);
          this.router.navigate(['/lessons']);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SubjectService } from '../_services/subject.service';
import { AlertService } from '../_services/alert.service';
import { Subscription } from 'rxjs';

@Component({ templateUrl: 'subject-create.component.html' })
export class SubjectCreateComponent implements OnInit, OnDestroy {
  pageTitle = 'Create Subject';
  subjectForm: FormGroup;
  loading = false;
  submitted = false;
  private subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private subjectService: SubjectService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.subjectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.subjectForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.subjectForm.invalid) {
      return;
    }

    this.loading = true;
    this.subscription = this.subjectService
      .createSubject(this.subjectForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Subject successful created', true);
          this.loading = false;
          this.router.navigate(['/subjects']);
        },
        (error) => {
          this.alertService.error('Subject failed on creation.');
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

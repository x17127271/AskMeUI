import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SubjectService } from '../_services/subject.service';
import { AlertService } from '../_services/alert.service';

@Component({ templateUrl: 'subject-create.component.html' })
export class SubjectCreateComponent implements OnInit {
  subjectForm: FormGroup;
  loading = false;
  submitted = false;

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
    this.subjectService
      .createSubject(this.subjectForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Subject successful created', true);
          this.router.navigate(['/subject']);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}

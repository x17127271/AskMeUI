import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ExamService } from '../_services/exam.service';
import { AlertService } from '../_services/alert.service';

@Component({ templateUrl: 'exam-create.component.html' })
export class ExamCreateComponent implements OnInit {
  examForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private examService: ExamService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.examForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.examForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.examForm.invalid) {
      return;
    }

    this.loading = true;
    this.examService
      .createExamQuestions(this.examForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Exam successful created', true);
          this.router.navigate(['/exams']);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}

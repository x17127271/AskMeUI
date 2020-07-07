import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { QuestionService } from '../_services/question.service';
import { AlertService } from '../_services/alert.service';

@Component({ templateUrl: 'question-create.component.html' })
export class QuestionCreateComponent implements OnInit {
  questionForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private questionService: QuestionService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.questionForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.questionForm.invalid) {
      return;
    }

    this.loading = true;
    this.questionService
      .createQuestion(this.questionForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Question successful created', true);
          this.router.navigate(['/questions']);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}

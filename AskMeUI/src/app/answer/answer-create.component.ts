import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AnswerService } from '../_services/answer.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-answer-create',
  templateUrl: 'answer-create.component.html'
})
export class AnswerCreateComponent implements OnInit {
  pageTitle = 'Create a new Answer';
  answerForm: FormGroup;
  loading = false;
  submitted = false;
  @Input() questionId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private answerService: AnswerService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.answerForm = this.formBuilder.group({
      title: ['', Validators.required],
      questionId: [this.questionId],
      isAccepted: [false]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.answerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.answerForm.invalid) {
      return;
    }

    this.loading = true;
    this.answerService
      .createAnswer(this.answerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Answer successful created', true);
          this.answerForm.reset();
          window.location.reload();
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}

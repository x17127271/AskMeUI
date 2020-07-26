import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AnswerService } from '../_services/answer.service';
import { AlertService } from '../_services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer-create',
  templateUrl: 'answer-create.component.html'
})
export class AnswerCreateComponent implements OnInit, OnDestroy {
  pageTitle = 'Create a new Answer';
  answerForm: FormGroup;
  loading = false;
  submitted = false;
  @Input() questionId: number;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private answerService: AnswerService,
    private alertService: AlertService,
    private route: ActivatedRoute
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
    this.subscription = this.answerService
      .createAnswer(this.answerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Answer successful created', true);
          this.loading = false;
          window.location.reload();
        },
        (error) => {
          this.alertService.error('Answer failed on creation.');
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

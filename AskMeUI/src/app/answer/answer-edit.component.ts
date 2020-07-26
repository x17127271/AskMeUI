import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IAnswer } from '../_models/answer';
import { AnswerService } from '../_services/answer.service';
import { AlertService } from '../_services/alert.service';

@Component({
  templateUrl: './answer-edit.component.html'
})
export class AnswerEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Answer Edit';
  answer: IAnswer;
  errorMessage: string;
  private subscription: Subscription;
  private subscriptionUp: Subscription;
  answerForm: FormGroup;
  loading = false;
  submitted = false;
  questionId: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private answerService: AnswerService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  get f() {
    return this.answerForm.controls;
  }

  createForm(): any {
    this.questionId = +this.route.snapshot.paramMap.get('questionid');
    const answerId = +this.route.snapshot.paramMap.get('answerid');

    this.subscription = this.answerService
      .getAnswerById(answerId, this.questionId)
      .subscribe({
        next: (answer) => {
          this.answer = answer;
          this.answerForm = this.formBuilder.group({
            title: [this.answer.title, Validators.required],
            id: [answerId],
            questionId: [this.questionId],
            isAccepted: [this.answer.isAccepted]
          });
        },
        error: (err) => (this.errorMessage = err)
      });
  }

  updateAnswer() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.answerForm.invalid) {
      return;
    }

    this.loading = true;
    this.subscriptionUp = this.answerService
      .updateAnswer(this.answerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Answer successful updated.');
          this.loading = false;
          this.createForm();
        },
        (error) => {
          this.alertService.error('Answer failed to update.');
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionUp) {
      this.subscriptionUp.unsubscribe();
    }
  }
}

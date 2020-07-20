import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IAnswer } from '../_models/answer';
import { AnswerService } from '../_services/answer.service';

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
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    // this.subjectForm = this.formBuilder.group({});
    this.createForm();
  }
  get f() {
    return this.answerForm.controls;
  }

  createForm(): any {
    // + to cast to number
    this.questionId = +this.route.snapshot.paramMap.get('questionid');
    const answerId = +this.route.snapshot.paramMap.get('answerid');
    // change this calling service
    this.subscription = this.answerService
      .getAnswerById(answerId, this.questionId)
      .subscribe({
        next: (answer) => {
          this.answer = answer;
          this.answerForm = this.formBuilder.group({
            title: [this.answer.title, Validators.required],
            id: [answerId],
            questionId: [this.questionId]
          });
        },
        error: (err) => (this.errorMessage = err)
      });
  }

  updateAnswer() {
    this.submitted = true;

    // reset alerts on submit

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
          // this.alertService.success('Subject successful created', true);
          // this.router.navigate(['/subjects']);
        },
        (error) => {
          // this.alertService.error(error);
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

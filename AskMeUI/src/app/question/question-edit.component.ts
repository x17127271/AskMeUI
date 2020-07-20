import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IQuestion } from '../_models/question';
import { QuestionService } from '../_services/question.service';

@Component({
  templateUrl: './question-edit.component.html'
})
export class QuestionEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Question Edit';

  question: IQuestion;
  errorMessage: string;
  private subscription: Subscription;
  private subscriptionUp: Subscription;
  questionForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  get f() {
    return this.questionForm.controls;
  }

  createForm(): any {
    // + to cast to number
    const lessonId = +this.route.snapshot.paramMap.get('lessonid');
    const questionId = +this.route.snapshot.paramMap.get('questionid');
    // change this calling service
    this.subscription = this.questionService
      .getQuestionById(questionId, lessonId)
      .subscribe({
        next: (question) => {
          this.question = question;
          this.questionForm = this.formBuilder.group({
            title: [this.question.title, Validators.required],
            lessonId: [lessonId],
            id: [questionId]
          });
        },
        error: (err) => (this.errorMessage = err)
      });
  }

  updateQuestion() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.questionForm.invalid) {
      return;
    }

    this.loading = true;
    this.subscriptionUp = this.questionService
      .updateQuestion(this.questionForm.value)
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

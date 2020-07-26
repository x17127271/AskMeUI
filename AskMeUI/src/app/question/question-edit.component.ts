import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IQuestion } from '../_models/question';
import { QuestionService } from '../_services/question.service';
import { AlertService } from '../_services/alert.service';

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
  lessonId: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  get f() {
    return this.questionForm.controls;
  }

  createForm(): any {
    this.lessonId = +this.route.snapshot.paramMap.get('lessonid');
    const questionId = +this.route.snapshot.paramMap.get('questionid');

    this.subscription = this.questionService
      .getQuestionById(questionId, this.lessonId)
      .subscribe({
        next: (question) => {
          this.question = question;
          this.questionForm = this.formBuilder.group({
            title: [this.question.title, Validators.required],
            lessonId: [this.lessonId],
            id: [questionId]
          });
        },
        error: (err) => (this.errorMessage = err)
      });
  }

  updateQuestion() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
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
          this.alertService.success('Question successful updated');
          this.loading = false;
          this.router.navigate([
            '/lessons',
            this.lessonId,
            'questions',
            this.question.id,
            'edit'
          ]);
        },
        (error) => {
          this.alertService.error('Question failed on updating.');
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

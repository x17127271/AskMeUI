import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IQuestion } from '../_models/question';
import { QuestionService } from '../_services/question.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './question-details.component.html'
})
export class QuestionDetailsComponent implements OnInit, OnDestroy {
  pageTitle = 'Question Details';
  question: IQuestion;
  errorMessage: string;
  questionId: number;
  lessonId: number;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {
    this.questionId = +this.route.snapshot.paramMap.get('questionid');
    this.lessonId = +this.route.snapshot.paramMap.get('lessonid');
  }

  ngOnInit(): void {
    this.subscription = this.questionService
      .getQuestionById(this.questionId, this.lessonId)
      .subscribe({
        next: (question) => {
          this.question = question;
        },
        error: (err) => (this.errorMessage = err)
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

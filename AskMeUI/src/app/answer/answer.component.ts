import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AnswerService } from '../_services/answer.service';
import { IAnswer } from '../_models/answer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer-list',
  templateUrl: 'answer.component.html'
})
export class AnswerComponent implements OnInit, OnDestroy {
  pageTitle = 'Answers';
  private subscription: Subscription;
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAnswers = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.answers;
  }

  @Input() questionId: number;
  filteredAnswers: IAnswer[];
  answers: IAnswer[];
  errorMessage: string;

  constructor(private answerService: AnswerService) {}

  ngOnInit() {
    this.subscription = this.answerService
      .getAnswers(this.questionId)
      .subscribe({
        next: (answers) => {
          this.answers = answers;
          this.filteredAnswers = this.answers;
        },
        error: (err) => (this.errorMessage = err)
      });
  }

  performFilter(filterBy: string): IAnswer[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.answers.filter(
      (answer: IAnswer) =>
        answer.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

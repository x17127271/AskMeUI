import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../_services/question.service';
import { IQuestion } from '../_models/question';

@Component({ templateUrl: 'question.component.html' })
export class QuestionComponent implements OnInit {
  pageTitle: string = 'Questions';

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredQuestions = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.questions;
  }

  filteredQuestions: IQuestion[];
  questions: IQuestion[];
  errorMessage: string;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    // pass lessonId on a prope way to getquestions
    this.questionService.getQuestions(1).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.filteredQuestions = this.questions;
      },
      error: (err) => (this.errorMessage = err)
    });
  }

  performFilter(filterBy: string): IQuestion[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.questions.filter(
      (question: IQuestion) =>
        question.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
}

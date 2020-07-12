import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExamService } from '../_services/exam.service';
import { IExam } from '../_models/exam';
import { Subscription } from 'rxjs';

@Component({ templateUrl: 'exam.component.html' })
export class ExamComponent implements OnInit, OnDestroy {
  pageTitle = 'Exams';
  private subscription: Subscription;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredExams = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.exams;
  }

  filteredExams: IExam[];
  exams: IExam[];
  errorMessage: string;

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.subscription = this.examService.getExams().subscribe({
      next: (exams) => {
        this.exams = exams;
        this.filteredExams = this.exams;
      },
      error: (err) => (this.errorMessage = err)
    });
  }

  performFilter(filterBy: string): IExam[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.exams.filter(
      (exam: IExam) => exam.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IResult } from '../_models/result';
import { IExam } from '../_models/exam';
import { ExamService } from '../_services/exam.service';
import { ResultService } from '../_services/result.service';

@Component({ templateUrl: 'result.component.html' })
export class ResultComponent implements OnInit, OnDestroy {
  pageTitle = 'Results';
  private subscription: Subscription;
  private subscriptionExam: Subscription;

  filteredResults: IResult[];
  results: IResult[];
  errorMessage: string;
  exams: IExam[];
  selectedExam: number;

  constructor(
    private resultService: ResultService,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.subscriptionExam = this.examService.getExams().subscribe((data) => {
      this.exams = data;
    });
  }

  loadResults(event: any) {
    const examId = event.target.value;
    if (examId && examId > 0) {
      this.subscription = this.resultService.getResults(examId).subscribe({
        next: (results) => {
          this.results = results;
          this.filteredResults = this.results;
        },
        error: (err) => (this.errorMessage = err)
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionExam) {
      this.subscriptionExam.unsubscribe();
    }
  }
}

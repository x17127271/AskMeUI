import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExam } from '../_models/exam';
import { ExamService } from '../_services/exam.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './exam-details.component.html'
})
export class ExamDetailsComponent implements OnInit, OnDestroy {
  pageTitle = 'Exam Details';
  exam: IExam;
  errorMessage: string;
  examQuestions: any;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    // + to cast to number
    const id = this.route.snapshot.paramMap.get('id');
    // change this calling service
    this.subscription = this.examService.getExamById(+id).subscribe({
      next: (exam) => {
        this.exam = exam;
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExam } from '../_models/exam';
import { ExamService } from '../_services/exam.service';

@Component({
  templateUrl: './exam-details.component.html'
})
export class ExamDetailsComponent implements OnInit {
  pageTitle: string = 'Exam Details';
  exam: IExam;
  errorMessage: string;
  examQuestions: any;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    // + to cast to number
    const id = this.route.snapshot.paramMap.get('id');
    // change this calling service
    this.examService.getExamById(+id).subscribe({
      next: (exam) => {
        this.exam = exam;
      },
      error: (err) => (this.errorMessage = err)
    });
  }
}

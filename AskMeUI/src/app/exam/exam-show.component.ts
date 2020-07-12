import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExam } from '../_models/exam';
import { ExamService } from '../_services/exam.service';
import { IQuestion } from '../_models/question';
import { IAnswer } from '../_models/answer';
import { IQuestionExam } from '../_models/questionExam';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './exam-show.component.html'
})
export class ExamShowComponent implements OnInit, OnDestroy {
  pageTitle = 'Exam';
  examDetails: IExam;
  questions: IQuestion[];
  answers: IAnswer[];
  errorMessage: string;
  questionsExam: IQuestionExam[];
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit(): void {}

  getQuestions() {
    const examId = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.examService.getExamQuestions(examId).subscribe({
      next: (examQuestion) => {
        console.log(examQuestion);
        this.examDetails = examQuestion.exam;
        this.questionsExam = examQuestion.questions;
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

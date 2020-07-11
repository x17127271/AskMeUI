import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExam } from '../_models/exam';
import { ExamService } from '../_services/exam.service';
import { IQuestion } from '../_models/question';
import { IAnswer } from '../_models/answer';
import { IQuestionExam } from '../_models/questionExam';

@Component({
  templateUrl: './exam-show.component.html'
})
export class ExamShowComponent implements OnInit {
  pageTitle: string = 'Exam';
  examDetails: IExam;
  questions: IQuestion[];
  answers: IAnswer[];
  errorMessage: string;
  examQuestions: any;
  questionsExam: IQuestionExam[];

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    // + to cast to number
    //const id = this.route.snapshot.paramMap.get('id');
    // change this calling service
  }

  getQuestions() {
    this.examService.getExamQuestions(1).subscribe({
      next: (examQuestion) => {
        console.log(examQuestion);
        this.examDetails = examQuestion.exam;
        //console.log(this.examDetails);
        this.questions = examQuestion.questions;
        //console.log(this.questions);
        this.questionsExam = examQuestion.questions;
        console.log(this.questionsExam);
      },
      error: (err) => (this.errorMessage = err)
    });
  }
}

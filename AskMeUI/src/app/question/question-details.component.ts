import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IQuestion } from '../_models/question';
import { QuestionService } from '../_services/question.service';

@Component({
  templateUrl: './question-details.component.html'
})
export class QuestionDetailsComponent implements OnInit {
  pageTitle = 'Question Details';
  question: IQuestion;
  errorMessage: string;
  questionId: number;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {
    this.questionId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.questionService.getQuestionById(this.questionId).subscribe({
      next: (question) => {
        this.question = question;
      },
      error: (err) => (this.errorMessage = err)
    });
  }
}

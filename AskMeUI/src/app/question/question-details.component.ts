import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IQuestion } from '../_models/question';
import { QuestionService } from '../_services/question.service';

@Component({
  templateUrl: './question-details.component.html'
})
export class QuestionDetailsComponent implements OnInit {
  pageTitle: string = 'Question Details';
  question: IQuestion;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    // + to cast to number
    const id = this.route.snapshot.paramMap.get('id');
    // change this calling service
    this.questionService.getQuestionById(+id).subscribe({
      next: (question) => {
        this.question = question;
      },
      error: (err) => (this.errorMessage = err)
    });
  }
}

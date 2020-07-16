import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExam } from '../_models/exam';
import { ExamService } from '../_services/exam.service';
import { IQuestion } from '../_models/question';
import { IAnswer } from '../_models/answer';
import { IQuestionExam } from '../_models/questionExam';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ExamResult } from '../_models/examResult';
import { ExamAnswerResult } from '../_models/examAnswerResult';
import { ResultService } from '../_services/result.service';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './exam-show.component.html'
})
export class ExamShowComponent implements OnInit, OnDestroy {
  pageTitle = 'Exam';
  examDetails: IExam;
  //questions: IQuestion[];
  //answers: IAnswer[];
  errorMessage: string;
  questionsExam: IQuestionExam[];
  examResultForm: FormGroup;
  loading = false;
  submitted = false;
  private subscription: Subscription;
  private subscriptionRes: Subscription;
  examResult: ExamResult[] = [];

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private formBuilder: FormBuilder,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.examResultForm = this.formBuilder.group({});
    this.getQuestions();
  }

  createForm(): any {
    this.examResultForm = this.formBuilder.group(
      this.questionsExam.reduce((group: any, question: { id: number }) => {
        return Object.assign(group, {
          ['q' + question.id]: this.buildSubGroup(question)
        });
      }, {})
    );
  }
  private buildSubGroup(question) {
    return this.formBuilder.group(
      question.answers.reduce((subGroup, answer: { id: number }) => {
        return Object.assign(subGroup, { ['a' + answer.id]: [false] });
      }, {})
    );
  }
  getQuestions() {
    const examId = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.examService.getExamQuestions(examId).subscribe({
      next: (examQuestion) => {
        this.examDetails = examQuestion.exam;
        this.questionsExam = examQuestion.questions;
        this.createForm();
      },
      error: (err) => (this.errorMessage = err)
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.examResultForm.invalid) {
      return;
    }

    this.loading = true;
    const formObj = this.examResultForm.getRawValue();
    // dynamically parse answers from the exam
    Object.keys(formObj).forEach((key) => {
      const result = new ExamResult();
      const value = formObj[key];
      const questionId = +key.substring(1);

      result.questionId = questionId;
      result.answers = [];
      const examId = +this.route.snapshot.paramMap.get('id');
      result.examId = examId;

      Object.keys(value).forEach((a) => {
        const answerRes = new ExamAnswerResult();
        const aValue = value[a];
        const answId = +a.substring(1);

        answerRes.answerId = answId;
        answerRes.answerValue = aValue;
        result.answers.push(answerRes);
      });
      console.log(result);
      this.examResult.push(result);
      console.log(this.examResult);
    });

    this.subscriptionRes = this.resultService
      .processExamResult(this.examResult)
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionRes) {
      this.subscriptionRes.unsubscribe();
    }
  }
}

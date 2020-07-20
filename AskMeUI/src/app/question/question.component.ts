import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../_services/question.service';
import { IQuestion } from '../_models/question';
import { Subscription } from 'rxjs';
import { ISubject } from '../_models/subject';
import { ILesson } from '../_models/lesson';
import { LessonService } from '../_services/lesson.service';
import { SubjectService } from '../_services/subject.service';

@Component({ templateUrl: 'question.component.html' })
export class QuestionComponent implements OnInit, OnDestroy {
  pageTitle = 'Questions';
  private subscription: Subscription;
  private subscriptonLes: Subscription;
  private subscriptionSub: Subscription;
  lessonId: number;

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
  subjects: ISubject[];
  lessons: ILesson[];
  selectedSubject: number;

  constructor(
    private questionService: QuestionService,
    private lessonService: LessonService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.subscriptionSub = this.subjectService
      .getSubjects()
      .subscribe((data) => {
        this.subjects = data;
      });
  }

  loadLessons(event: any) {
    this.selectedSubject = event.target.value;
    if (this.selectedSubject && this.selectedSubject > 0) {
      this.subscriptonLes = this.lessonService
        .getLessons(this.selectedSubject)
        .subscribe((data) => {
          this.lessons = data;
        });
    }
  }

  loadQuestions(event: any) {
    this.lessonId = event.target.value;
    if (this.lessonId && this.lessonId > 0) {
      this.subscription = this.questionService
        .getQuestions(this.lessonId)
        .subscribe({
          next: (questions) => {
            this.questions = questions;
            this.filteredQuestions = this.questions;
          },
          error: (err) => (this.errorMessage = err)
        });
    }
  }

  performFilter(filterBy: string): IQuestion[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.questions.filter(
      (question: IQuestion) =>
        question.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionSub) {
      this.subscriptionSub.unsubscribe();
    }
    if (this.subscriptonLes) {
      this.subscriptonLes.unsubscribe();
    }
  }
}

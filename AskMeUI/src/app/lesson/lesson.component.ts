import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonService } from '../_services/lesson.service';
import { ILesson } from '../_models/lesson';
import { Subscription } from 'rxjs';
import { ISubject } from '../_models/subject';
import { SubjectService } from '../_services/subject.service';

@Component({ templateUrl: 'lesson.component.html' })
export class LessonComponent implements OnInit, OnDestroy {
  pageTitle = 'Lessons';
  private subscription: Subscription;
  filteredLessons: ILesson[];
  lessons: ILesson[];
  errorMessage: string;
  _listFilter: string;
  subjects: ISubject[];
  private subscriptionSub: Subscription;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredLessons = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.lessons;
  }

  constructor(
    private lessonService: LessonService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.getSubsjects();
  }

  loadLessons(event: any) {
    const subjectId = event.target.value;
    if (subjectId && subjectId > 0) {
      this.subscription = this.lessonService.getLessons(subjectId).subscribe({
        next: (lessons) => {
          this.lessons = lessons;
          this.filteredLessons = this.lessons;
        },
        error: (err) => (this.errorMessage = err)
      });
    }
  }

  getSubsjects() {
    this.subscriptionSub = this.subjectService
      .getSubjects()
      .subscribe((data) => {
        this.subjects = data;
      });
  }

  performFilter(filterBy: string): ILesson[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.lessons.filter(
      (lesson: ILesson) =>
        lesson.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionSub) {
      this.subscriptionSub.unsubscribe();
    }
  }
}

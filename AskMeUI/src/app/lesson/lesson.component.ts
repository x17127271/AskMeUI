import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LessonService } from '../_services/lesson.service';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { ILesson } from '../_models/lesson';

@Component({ templateUrl: 'lesson.component.html' })
export class LessonComponent implements OnInit {
  currentUser: User;
  pageTitle: string = 'Lesson List';

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredLessons = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.lessons;
  }

  filteredLessons: ILesson[];
  lessons: ILesson[];
  errorMessage: string;

  constructor(private lessonService: LessonService) {}

  ngOnInit() {
    // pass subjectId on a prope way to getlessons
    this.lessonService.getLessons(1).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
        this.filteredLessons = this.lessons;
      },
      error: (err) => (this.errorMessage = err)
    });
  }

  performFilter(filterBy: string): ILesson[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.lessons.filter(
      (lesson: ILesson) =>
        lesson.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
}

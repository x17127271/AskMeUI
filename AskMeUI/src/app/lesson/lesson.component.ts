import { Component, OnInit } from '@angular/core';
import { LessonService } from '../_services/lesson.service';
import { ILesson } from '../_models/lesson';

@Component({ templateUrl: 'lesson.component.html' })
export class LessonComponent implements OnInit {
  pageTitle: string = 'Lessons';

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

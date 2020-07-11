import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../_services/subject.service';
import { AlertService } from '../_services/alert.service';
import { ISubject } from '../_models/subject';

@Component({ templateUrl: 'subject.component.html' })
export class SubjectComponent implements OnInit {
  // subjects = [];
  pageTitle: string = 'Subjects';

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredSubjects = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.subjects;
  }

  filteredSubjects: ISubject[];
  subjects: ISubject[];
  errorMessage: string;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.subjectService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.filteredSubjects = this.subjects;
      },
      error: (err) => (this.errorMessage = err)
    });
  }

  performFilter(filterBy: string): ISubject[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.subjects.filter(
      (subject: ISubject) =>
        subject.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
}

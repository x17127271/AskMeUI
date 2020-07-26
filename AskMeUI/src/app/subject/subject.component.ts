import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubjectService } from '../_services/subject.service';
import { ISubject } from '../_models/subject';
import { Subscription } from 'rxjs';

@Component({ templateUrl: 'subject.component.html' })
export class SubjectComponent implements OnInit, OnDestroy {
  pageTitle = 'Subjects';

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
  private subscription: Subscription;
  loading = true;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.subscription = this.subjectService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.filteredSubjects = this.subjects;
        this.loading = false;
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

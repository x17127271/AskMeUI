import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubject } from '../_models/subject';
import { SubjectService } from '../_services/subject.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './subject-details.component.html'
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
  pageTitle = 'Subject Details';
  subject: ISubject;
  errorMessage: string;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    // + to cast to number
    const id = this.route.snapshot.paramMap.get('id');
    // change this calling service
    this.subscription = this.subjectService.getSubjectById(+id).subscribe({
      next: (subject) => {
        this.subject = subject;
      },
      error: (err) => (this.errorMessage = err)
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

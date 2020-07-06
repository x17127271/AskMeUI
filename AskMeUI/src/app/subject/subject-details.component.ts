import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubject } from '../_models/subject';
import { SubjectService } from '../_services/subject.service';

@Component({
  templateUrl: './subject-details.component.html'
})
export class SubjectDetailsComponent implements OnInit {
  pageTitle: string = 'Subject Details';
  subject: ISubject;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    // + to cast to number
    const id = this.route.snapshot.paramMap.get('id');
    // change this calling service
    this.subjectService.getSubjectById(+id).subscribe({
      next: (subject) => {
        this.subject = subject;
      },
      error: (err) => (this.errorMessage = err)
    });
  }
}

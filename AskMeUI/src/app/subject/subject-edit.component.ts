import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubject } from '../_models/subject';
import { SubjectService } from '../_services/subject.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './subject-edit.component.html'
})
export class SubjectEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Subject Edit';
  subject: ISubject;
  errorMessage: string;
  private subscription: Subscription;
  private subscriptionUp: Subscription;
  subjectForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.subjectForm = this.formBuilder.group({});
    this.createForm();
  }
  get f() {
    return this.subjectForm.controls;
  }

  createForm(): any {
    // + to cast to number
    const subjectId = +this.route.snapshot.paramMap.get('id');
    // change this calling service
    this.subscription = this.subjectService
      .getSubjectById(subjectId)
      .subscribe({
        next: (subject) => {
          this.subject = subject;
          this.subjectForm = this.formBuilder.group({
            title: [this.subject.title, Validators.required],
            description: [this.subject.description, Validators.required],
            id: [subjectId]
          });
        },
        error: (err) => (this.errorMessage = err)
      });
  }

  updateSubject() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.subjectForm.invalid) {
      return;
    }

    this.loading = true;
    this.subscriptionUp = this.subjectService
      .updateSubject(this.subjectForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          // this.alertService.success('Subject successful created', true);
          // this.router.navigate(['/subjects']);
        },
        (error) => {
          // this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionUp) {
      this.subscriptionUp.unsubscribe();
    }
  }
}

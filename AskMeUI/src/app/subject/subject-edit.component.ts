import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubject } from '../_models/subject';
import { SubjectService } from '../_services/subject.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';

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
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  get f() {
    return this.subjectForm.controls;
  }

  createForm(): any {
    const subjectId = +this.route.snapshot.paramMap.get('id');

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
    this.alertService.clear();
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
          this.alertService.success('Subject successful updated.');
          this.loading = false;
          this.router.navigate(['/subjects', this.subject.id, 'edit']);
        },
        (error) => {
          this.alertService.error('Subject failed on update.');
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

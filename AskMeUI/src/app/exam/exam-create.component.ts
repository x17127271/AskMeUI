import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ExamService } from '../_services/exam.service';
import { AlertService } from '../_services/alert.service';
import { Subscription } from 'rxjs';
import { SubjectService } from '../_services/subject.service';
import { ISubject } from '../_models/subject';

@Component({ templateUrl: 'exam-create.component.html' })
export class ExamCreateComponent implements OnInit, OnDestroy {
  examForm: FormGroup;
  loading = false;
  submitted = false;
  private subscription: Subscription;
  private subscriptionSub: Subscription;
  subjects: ISubject[];
  pageTitle = 'Create a new Exam';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private examService: ExamService,
    private alertService: AlertService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.examForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      subjectId: ['', Validators.required],
      totalQuestions: ['', Validators.required]
    });

    this.getSubjects();
  }

  getSubjects() {
    this.subscriptionSub = this.subjectService
      .getSubjects()
      .subscribe((data) => {
        this.subjects = data;
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.examForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.examForm.invalid) {
      return;
    }

    this.loading = true;
    this.subscription = this.examService
      .createExamQuestions(this.examForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Exam successful created', true);
          this.router.navigate(['/exams']);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
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

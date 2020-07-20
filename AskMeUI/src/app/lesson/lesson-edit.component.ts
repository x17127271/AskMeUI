import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubject } from '../_models/subject';
import { SubjectService } from '../_services/subject.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ILesson } from '../_models/lesson';
import { LessonService } from '../_services/lesson.service';

@Component({
  templateUrl: './lesson-edit.component.html'
})
export class LessonEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Lesson Edit';
  subject: ISubject;
  lesson: ILesson;
  errorMessage: string;
  private subscription: Subscription;
  private subscriptionUp: Subscription;
  lessonForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    // this.subjectForm = this.formBuilder.group({});
    this.createForm();
  }
  get f() {
    return this.lessonForm.controls;
  }

  createForm(): any {
    // + to cast to number
    const lessonId = +this.route.snapshot.paramMap.get('lessonid');
    const subjectId = +this.route.snapshot.paramMap.get('subjectid');
    // change this calling service
    this.subscription = this.lessonService
      .getLessonById(lessonId, subjectId)
      .subscribe({
        next: (lesson) => {
          this.lesson = lesson;
          this.lessonForm = this.formBuilder.group({
            title: [this.lesson.title, Validators.required],
            description: [this.lesson.description, Validators.required],
            id: [lessonId],
            subjectId: [subjectId]
          });
        },
        error: (err) => (this.errorMessage = err)
      });
  }

  updateLesson() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.lessonForm.invalid) {
      return;
    }

    this.loading = true;
    this.subscriptionUp = this.lessonService
      .updateLesson(this.lessonForm.value)
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

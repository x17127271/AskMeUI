import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ILesson } from '../_models/lesson';
import { LessonService } from '../_services/lesson.service';
import { AlertService } from '../_services/alert.service';

@Component({
  templateUrl: './lesson-edit.component.html'
})
export class LessonEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Lesson Edit';
  lesson: ILesson;
  errorMessage: string;
  private subscription: Subscription;
  private subscriptionUp: Subscription;
  lessonForm: FormGroup;
  loading = false;
  submitted = false;
  subjectId: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private lessonService: LessonService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  get f() {
    return this.lessonForm.controls;
  }

  createForm(): any {
    const lessonId = +this.route.snapshot.paramMap.get('lessonid');
    this.subjectId = +this.route.snapshot.paramMap.get('subjectid');

    this.subscription = this.lessonService
      .getLessonById(lessonId, this.subjectId)
      .subscribe({
        next: (lesson) => {
          this.lesson = lesson;
          this.lessonForm = this.formBuilder.group({
            title: [this.lesson.title, Validators.required],
            description: [this.lesson.description, Validators.required],
            id: [lessonId],
            subjectId: [this.subjectId]
          });
        },
        error: (err) => (this.errorMessage = err)
      });
  }

  updateLesson() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
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
          this.alertService.success('Lesson successful updated.');

          this.router.navigate([
            '/subjects',
            this.subjectId,
            'lessons',
            this.lesson.id,
            'edit'
          ]);
          this.loading = false;
        },
        (error) => {
          this.alertService.error('Lesson failed on updating.');
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

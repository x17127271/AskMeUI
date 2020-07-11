import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { QuestionService } from '../_services/question.service';
import { AlertService } from '../_services/alert.service';
import { LessonService } from '../_services/lesson.service';
import { ILesson } from '../_models/lesson';
import { SubjectService } from '../_services/subject.service';
import { ISubject } from '../_models/subject';

@Component({ templateUrl: 'question-create.component.html' })
export class QuestionCreateComponent implements OnInit {
  pageTitle = 'Create Question';
  questionForm: FormGroup;
  loading = false;
  submitted = false;
  lessons: ILesson[];
  subjects: ISubject[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private questionService: QuestionService,
    private alertService: AlertService,
    private lessonService: LessonService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      lessonId: ['', Validators.required],
      subjectId: ['']
    });
    this.getSubjects();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.questionForm.controls;
  }

  getLessons(): void {
    const value = this.questionForm.value.subjectId;
    this.lessonService.getLessons(value).subscribe((data) => {
      this.lessons = data;
    });
  }

  getSubjects(): void {
    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });
  }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.questionForm.invalid) {
      return;
    }

    this.loading = true;
    this.questionService
      .createQuestion(this.questionForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Question successful created', true);
          this.router.navigate(['/questions']);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}

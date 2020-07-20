import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILesson } from '../_models/lesson';
import { LessonService } from '../_services/lesson.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './lesson-details.component.html'
})
export class LessonDetailsComponent implements OnInit, OnDestroy {
  pageTitle = 'Lesson Details';
  lesson: ILesson;
  errorMessage: string;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    // + to cast to number
    console.log(this.route.snapshot.paramMap);
    const lessonId = this.route.snapshot.paramMap.get('lessonid');
    const subjectId = this.route.snapshot.paramMap.get('subjectid');
    console.log(this.route.snapshot.paramMap);
    // change this calling service
    this.subscription = this.lessonService
      .getLessonById(+lessonId, +subjectId)
      .subscribe({
        next: (lesson) => {
          this.lesson = lesson;
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

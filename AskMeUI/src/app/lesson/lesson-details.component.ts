import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILesson } from '../_models/lesson';
import { LessonService } from '../_services/lesson.service';

@Component({
  templateUrl: './lesson-details.component.html'
})
export class LessonDetailsComponent implements OnInit {
  pageTitle = 'Lesson Details';
  lesson: ILesson;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    // + to cast to number
    const id = this.route.snapshot.paramMap.get('id');
    // change this calling service
    this.lessonService.getLessonById(+id).subscribe({
      next: (lesson) => {
        this.lesson = lesson;
      },
      error: (err) => (this.errorMessage = err)
    });
  }
}

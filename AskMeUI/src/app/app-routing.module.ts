import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { AuthGuard } from '../app/_helpers/auth.guard';
import { SubjectCreateComponent } from './subject/subject-create.component';
import { SubjectComponent } from './subject/subject.component';
import { LessonCreateComponent } from './lesson/lesson-create.component';
import { LessonComponent } from './lesson/lesson.component';
import { SubjectDetailsComponent } from './subject/subject-details.component';
import { LessonDetailsComponent } from './lesson/lesson-details.component';
import { QuestionCreateComponent } from './question/question-create.component';
import { QuestionComponent } from './question/question.component';
import { QuestionDetailsComponent } from './question/question-details.component';
import { ExamComponent } from './exam/exam.component';
import { ExamCreateComponent } from './exam/exam-create.component';
import { ExamDetailsComponent } from './exam/exam-details.component';
import { ExamShowComponent } from './exam/exam-show.component';
import { ResultComponent } from './result/result.component';
import { SubjectEditComponent } from './subject/subject-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'subjects/create',
    component: SubjectCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subjects',
    component: SubjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subjects/:id',
    component: SubjectDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subjects/:id/edit',
    component: SubjectEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lessons/create',
    component: LessonCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lessons',
    component: LessonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lessons/:id',
    component: LessonDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questions/create',
    component: QuestionCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questions',
    component: QuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questions/:id',
    component: QuestionDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exams',
    component: ExamComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exams/create',
    component: ExamCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exams/:id',
    component: ExamDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exams/:id/show',
    component: ExamShowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'results',
    component: ResultComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

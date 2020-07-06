import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutingModule } from '../app/app-routing.module';
import { JwtInterceptor } from '../app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../app/_helpers/error.interceptor';
import { AppComponent } from '../app/app.component';
import { HomeComponent } from '../app/home/home.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { AlertComponent } from '../app/_components/alert.component';
import { SubjectCreateComponent } from '../app/subject/subject-create.component';
import { SubjectComponent } from '../app/subject/subject.component';
import { SubjectDetailsComponent } from '../app/subject/subject-details.component';
import { LessonCreateComponent } from '../app/lesson/lesson-create.component';
import { LessonComponent } from '../app/lesson/lesson.component';
import { LessonDetailsComponent } from '../app/lesson/lesson-details.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    SubjectCreateComponent,
    SubjectComponent,
    SubjectDetailsComponent,
    LessonCreateComponent,
    LessonComponent,
    LessonDetailsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { AuthGuard } from '../app/_helpers/auth.guard';
import { SubjectCreateComponent } from './subject/subject-create.component';
import { SubjectComponent } from './subject/subject.component';

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

  // otherwise redirect to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

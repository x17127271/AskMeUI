import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// used to create fake backend
// import { fakeBackendProvider } from "./_helpers";

import { appRoutingModule } from "../app/app-routing.module";
import { JwtInterceptor } from "../app/_helpers/jwt.interceptor";
import { ErrorInterceptor } from "../app/_helpers/error.interceptor";
import { AppComponent } from "../app/app.component";
import { HomeComponent } from "../app/home/home.component";
import { LoginComponent } from "../app/login/login.component";
import { RegisterComponent } from "../app/register/register.component";
import { AlertComponent } from "../app/_components/alert.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

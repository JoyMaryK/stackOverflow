import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { questionsReducers } from './Store/reducers/questionsReducer';
import { QuestionsEffects } from './Store/effects/questionsEffects';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeComponent,
    LandingPageComponent,
    LoginComponent,
    StoreModule.forRoot({questions:questionsReducers}),
    EffectsModule.forRoot([QuestionsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

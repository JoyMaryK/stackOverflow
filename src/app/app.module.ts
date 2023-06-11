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
import { UsersEffects } from './Store/effects/userEffects';
import { userReducers } from './Store/reducers/userReducers';
import { tagsReducers } from './Store/reducers/tagsReducers';
import { TagsEffects } from './Store/effects/tagsEffects';

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
    StoreModule.forRoot({questions:questionsReducers, users:userReducers, tags:tagsReducers}),
    EffectsModule.forRoot([QuestionsEffects, UsersEffects, TagsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

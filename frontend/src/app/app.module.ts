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
import { YourOneQuestionComponent } from './your-one-question/your-one-question.component';
import { HashPrefixPipe } from './Pipes/hash-prefix.pipe';
import { HttpClientModule } from '@angular/common/http';
import { answersReducers } from './Store/reducers/answersReducer';
import { AnswersEffects } from './Store/effects/answersEffects';
import { commentsReducers } from './Store/reducers/commentsReducers';
import { CommentsEffects } from './Store/effects/commentsEffects';
import { VotesEffects } from './Store/effects/votesEffects';
import { votesReducers } from './Store/reducers/votesReducers';
import { QuestionByTagComponent } from './question-by-tag/question-by-tag.component';
import { ErrorComponent } from './error/error.component';
import { BackgroundHighlightDirective } from './directives/background-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HashPrefixPipe,
   
   
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeComponent,
    LandingPageComponent,
    LoginComponent,
    ErrorComponent,
    BackgroundHighlightDirective,
    StoreModule.forRoot({questions:questionsReducers, users:userReducers, tags:tagsReducers, answers:answersReducers, comments:commentsReducers, votes:votesReducers}),
    EffectsModule.forRoot([QuestionsEffects, UsersEffects, TagsEffects, AnswersEffects, CommentsEffects, VotesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

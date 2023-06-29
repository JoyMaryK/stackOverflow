import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';

const routes: Routes = [
 
  { path: 'login',  loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  {path:'',loadComponent: () => import('./landing-page/landing-page.component').then(m => m.LandingPageComponent)},
  {path:'signup',loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)},
  {path:'admin-questions',loadComponent: () => import('./Admin/admin-questions/admin-questions.component').then(m => m.AdminQuestionsComponent)},
  {path:'admin-users',loadComponent: () => import('./Admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent)},
  {path:'home', component:NavSideBarComponent, children:[
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    {path:'your-questions',loadComponent: () => import('./your-questions/your-questions.component').then(m =>m.YourQuestionsComponent)},
    {path:'tags',loadComponent: () => import('./tags/tags.component').then(m =>m.TagsComponent)},
    {path:'ask',loadComponent: () => import('./ask-question/ask-question.component').then(m =>m.AskQuestionComponent)},
    {path:'update',loadComponent: () => import('./update-profile/update-profile.component').then(m =>m.UpdateProfileComponent)},
    {path:'view',loadComponent: () => import('./view-profile/view-profile.component').then(m =>m.ViewProfileComponent)},
    {path:'question/:id',loadComponent: () => import('./one-question/one-question.component').then(m =>m.OneQuestionComponent)},
    {path:'your-questions/your-question/:id',loadComponent: () => import('./your-one-question/your-one-question.component').then(m =>m.YourOneQuestionComponent)},
    {path:'update-question/:id',loadComponent: () => import('./update-question/update-question.component').then(m =>m.UpdateQuestionComponent)},
  ]},
 { path: '**', loadComponent: () => import('./not-found/not-found.component').then(m =>m.NotFoundComponent) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }

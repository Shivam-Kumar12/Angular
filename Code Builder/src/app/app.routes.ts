import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AboutComponent } from './component/about/about.component';
import { CreateBinComponent } from './component/create-bin/create-bin.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './component/home/home.component';
import { ViewSnippetComponent } from './component/view-snippet/view-snippet.component';
import { DefferdemoComponent } from './component/defferdemo/defferdemo.component';


export const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},
{path:'create',component:CreateBinComponent, canActivate: [authGuard] },
{ path: 'demo', component: DefferdemoComponent},
{ path: 'about', loadComponent: () => import('./component/about/about.component').then(mod => mod.AboutComponent) },
{path:"",component:HomeComponent},
{path:"snippet/:id", component:ViewSnippetComponent},
{ path: '**', component:NotFoundComponent }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashHomeComponent } from './dashboard/dash-home/dash-home.component';
import { CreateComponent } from './dashboard/create/create.component';
import { ContactComponent } from './dashboard/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'posts/:id', component: PostComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'db', component: DashboardComponent,
        children: [
            { path: 'home', outlet: 'renSec', component: DashHomeComponent },
            { path: 'create', outlet: 'renSec', component: CreateComponent },
            { path: 'contact', outlet: 'renSec', component: ContactComponent },
        ]
    },

];

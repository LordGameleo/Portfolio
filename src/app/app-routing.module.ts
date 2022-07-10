import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { SkillAndToolsComponent } from './components/skill-and-tools/skill-and-tools.component';
import { WorkComponent } from './components/work/work.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'skills',
        component: SkillAndToolsComponent
    },
    {
        path: 'work',
        component: WorkComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

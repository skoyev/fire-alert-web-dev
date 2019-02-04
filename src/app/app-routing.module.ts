import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '@appContainers/dashboard/dashboard.component';
import { HeroesComponent } from '@appContainers/heroes/heroes.component';
import { HeroDetailComponent } from '@appContainers/hero-detail/hero-detail.component';
import { HeroesGuard } from '@appGuards/heroes.guard';
import { SelectedHeroGuard } from '@appGuards/selected-hero.guard';
import { LoginComponent } from '@appContainers/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },
  {
    path: 'invoices',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'calls',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },
  {
    path: 'leads',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },    
  {
    path: 'workorders',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'jobs',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'customers',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'schedule',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'invoices',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'reports',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'news_menu',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'tools',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'directory',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },  
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
    canActivate: [SelectedHeroGuard]
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [HeroesGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HeroesGuard, SelectedHeroGuard]
})
export class AppRoutingModule {}

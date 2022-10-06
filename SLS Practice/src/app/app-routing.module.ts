import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyHomeComponent } from './my-home/my-home.component';
import { ViewHomeComponent } from './view-home/view-home.component';

const routes: Routes = [
  {
    path: '',
    component: MyHomeComponent
  },
  {
    path: 'bookmark',
    component: MyHomeComponent
  },
  {
    path: 'view',
    component: ViewHomeComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

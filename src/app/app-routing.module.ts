import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'list', loadComponent: () => import('./matches-list/matches-list.component').then(m => m.MatchesListComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

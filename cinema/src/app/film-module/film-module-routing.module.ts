import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmListComponent} from './film-list/film-list.component';
import {FilmCreateComponent} from './film-create/film-create.component';
import {FilmModuleComponent} from './film-module.component';
import {FilmInfoComponent} from './film-info/film-info.component';
import {FlimListComponent} from './flim-list/flim-list.component';

const routes: Routes = [
  {path: 'list', component: FilmListComponent},
  {path: 'create', component: FilmCreateComponent},
  {path: 'update/:id', component: FilmCreateComponent},
  {
    path: 'film', component: FilmModuleComponent, children: [
      {
        path: 'info/:id', component: FilmInfoComponent
      },
      {
        path: 'list', component: FlimListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmModuleRoutingModule {
}

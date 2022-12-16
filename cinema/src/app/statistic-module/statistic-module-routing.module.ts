import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmstatisticComponent} from './filmstatistic/filmstatistic.component';
import {AccountstatisticComponent} from './accountstatistic/accountstatistic.component';


const routes: Routes = [
  {
    path: 'currentDay',
    component: FilmstatisticComponent
  },
  {
    path: 'account',
    component: AccountstatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticModuleRoutingModule { }

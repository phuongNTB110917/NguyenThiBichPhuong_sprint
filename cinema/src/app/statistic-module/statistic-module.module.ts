import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmstatisticComponent } from './filmstatistic/filmstatistic.component';
import { AccountstatisticComponent } from './accountstatistic/accountstatistic.component';
import {StatisticModuleRoutingModule} from './statistic-module-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [FilmstatisticComponent, AccountstatisticComponent],
  imports: [
    CommonModule,
    StatisticModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StatisticModuleModule { }

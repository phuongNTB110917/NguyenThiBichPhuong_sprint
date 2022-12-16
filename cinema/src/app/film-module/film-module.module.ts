import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilmListComponent} from './film-list/film-list.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilmCreateComponent } from './film-create/film-create.component';
import {HttpClientModule} from '@angular/common/http';
import {FilmModuleRoutingModule} from './film-module-routing.module';
import {FlimListComponent} from './flim-list/flim-list.component';
import {FilmModuleComponent} from './film-module.component';
import {FilmInfoComponent} from './film-info/film-info.component';
import {SafePipeModule} from 'safe-pipe';

@NgModule({
  declarations: [FilmListComponent, FilmCreateComponent, FlimListComponent, FilmInfoComponent, FilmModuleComponent],
  exports: [
    FilmListComponent,
    FilmCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FilmModuleRoutingModule,
    SafePipeModule
    // HttpClientModule,
    // FilmModuleRoutingModule,
    // BrowserAnimationsModule,
    // ToastrModule.forRoot({
    //   timeOut: 1500,
    //   progressBar: true,
    //   progressAnimation: 'increasing',
    //   preventDuplicates: true
    // })
  ]
})
export class FilmModuleModule {
}

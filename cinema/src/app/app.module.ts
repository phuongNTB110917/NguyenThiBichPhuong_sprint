import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccountModuleModule} from './account-module/account-module.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SecurityModule} from './security/security.module';
import {AuthenticationService} from './security/service/authentication.service';
import {TokenStorageService} from './security/service/token-storage-service.service';
import {HttpClientModule} from '@angular/common/http';
import {FilmModuleRoutingModule} from './film-module/film-module-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FilmModuleModule} from './film-module/film-module.module';
import {BookingModuleModule} from './booking-module/booking-module.module';
import { HeadFooterComponent } from './head-footer/head-footer.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadFooterComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModuleModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    ShowHidePasswordModule,
    SecurityModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FilmModuleRoutingModule,
    FilmModuleModule,
    BookingModuleModule,
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        preventDuplicates: true
      }
    )
  ],
  providers: [
    AuthenticationService,
    TokenStorageService

  ],
    exports: [
        BookingModuleModule,
        HttpClientModule,
        HeadFooterComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

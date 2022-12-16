import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookedTicketComponent } from './booked-ticket/booked-ticket.component';
import {TicketModuleRoutingModule} from './ticket-module-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {AccountModuleModule} from '../account-module/account-module.module';



@NgModule({
  declarations: [BookedTicketComponent],
  imports: [
    CommonModule,
    TicketModuleRoutingModule,
    HttpClientModule,
    AccountModuleModule,
  ]
})
export class TicketModuleModule { }

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookedTicketComponent} from './booked-ticket/booked-ticket.component';

const routes: Routes = [
  {
    path: 'getbookedticket',
    component: BookedTicketComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketModuleRoutingModule { }

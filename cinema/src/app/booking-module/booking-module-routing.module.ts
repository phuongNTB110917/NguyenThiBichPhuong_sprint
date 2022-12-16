import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingFilmComponent} from './booking-film/booking-film.component';
import {BookingSeatComponent} from './booking-seat/booking-seat.component';
import {ManagerBookingListComponent} from './manager-booking-list/manager-booking-list.component';
import {ManagerBookingDetailComponent} from './manager-booking-detail/manager-booking-detail.component';
import {ManagerBookingInformationComponent} from './manager-booking-information/manager-booking-information.component';

const routes: Routes = [
  {path: 'bookingFilm', component: BookingFilmComponent},
  {path: 'bookingSeat/:id', component: BookingSeatComponent},
  {path: 'managerBooking/list', component: ManagerBookingListComponent},
  {path: 'managerBooking/detail/:id', component: ManagerBookingDetailComponent},
  {path: 'managerBooking/takeTicket/:id', component: ManagerBookingInformationComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingModuleRoutingModule { }


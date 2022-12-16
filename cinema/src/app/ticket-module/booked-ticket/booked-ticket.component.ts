import {Component, OnInit} from '@angular/core';
import {TicketService} from '../service/ticket.service';
import {BookedTicket} from '../../model/booked-ticket';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-booked-ticket',
  templateUrl: './booked-ticket.component.html',
  styleUrls: ['./booked-ticket.component.css']
})
export class BookedTicketComponent implements OnInit {
// tickets: List[]=[],
//   indexPagination = 1;
//   totalPagination: number;
  indexPagination = 1;
  totalPages = 1;
  bookedTickets: BookedTicket[];
  name: string;
  id: number;
  price: any;

  constructor(
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.id = 1;
    this.getBookedTicket();
  }

  getBookedTicket() {
    this.ticketService.getBookedTicket(this.indexPagination, this.id).subscribe(data => {
      console.log(data);
      this.bookedTickets = data.content;
      this.totalPages = data.totalPages;
      this.indexPagination = data.number + 1;
    }, error => {
      console.log(error);
    });
  }

  deleteTicket() {
    console.log(this.id);
    this.ticketService.deleteTicket(this.id).subscribe(data => {
        console.log(data);
        this.toastr.success('Xóa thành công');
        // alert('Xóa thành công');
        this.ngOnInit();
      }, e => {
        console.log(e);
      }
    );
  }

  findBookedTicketDeleteById(name: string, price: any, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }

  firstPage() {
    this.indexPagination = 1;
    this.ngOnInit();
  }

  nextPage() {
    if (this.indexPagination < this.totalPages) {
      this.indexPagination = this.indexPagination + 1;
      this.ngOnInit();

    }

  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination = this.indexPagination - 1;
      this.ngOnInit();
    }
  }

  lastPage() {
    this.indexPagination = this.totalPages ;
    this.ngOnInit();
  }

}

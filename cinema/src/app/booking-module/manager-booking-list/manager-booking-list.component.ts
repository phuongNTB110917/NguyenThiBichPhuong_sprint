import { Component, OnInit } from '@angular/core';
import {ManagerBookingService} from '../service/manager-booking.service';
import {Content} from '../../model/content/content';
import {Page} from '../../model/content/page';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-manager-booking-list',
  templateUrl: './manager-booking-list.component.html',
  styleUrls: ['./manager-booking-list.component.css']
})
export class ManagerBookingListComponent implements OnInit {
  indexPagination = 0;
  page: Page;
  number: number;
  contents: Content[];
  totalPages: number;
  size: number;
  message: string;
 searchForm: FormGroup = new FormGroup({
    key: new FormControl('')
  });
  constructor(private managerBookingService: ManagerBookingService) {
  }

  ngOnInit(): void {
    this.onSearch();
  }
  previousPage() {
    this.indexPagination -= 1;
    this.onSearch();
  }

  nextPage() {
    this.indexPagination += 1;
    this.onSearch();
  }

  onSearch() {
    this.managerBookingService.getAll(this.searchForm.value.key, this.indexPagination).subscribe(page => {
      if (page.content != null) {
        this.contents = page.content;
        this.indexPagination = page.number;
        this.page = page;
        this.size = page.size;
        this.totalPages = page.totalPages;
        this.number = page.totalElements;
      }
      if (page.content.length !== 0) {
        this.message = '';
      } else { this.message = 'NOT FOUND'; }
    });
    console.log(this.message);
  }
}

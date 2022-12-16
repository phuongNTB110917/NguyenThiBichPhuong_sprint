import { Component, OnInit } from '@angular/core';
import {Account} from '../../../model/account';
import {AccountServiceService} from '../../service/account-service.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  page: number = 0;
  fullname: string;
  id: number;
  searchForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
  });
  itemsPerPage = 7;
  totalItems: any;
  public labels: any = {
    previousLabel: 'Trang trước',
    nextLabel: 'Trang kế'
  };

  constructor(private accountService: AccountServiceService) { }

  ngOnInit(): void {
    this.getAll(this.page);
  }

  getAll(page: any) {
    this.accountService.getAll(this.page, this.searchForm.value.fullname).subscribe(next => {
      this.accounts = next['content'];
      this.totalItems = next['totalElements'];
    });
  }

  // gty(page: any) {
  //   this.accountService.getAll(this.page , this.searchForm.value.fullname).subscribe(next => {
  //     this.accounts = next['content'];
  //     this.totalItems = next['totalElements'];
  //   });
  // }
}


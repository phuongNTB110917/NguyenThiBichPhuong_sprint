import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {History} from '../../../model/history';
import {checkValidDate} from '../../validator/validateDate';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {HistoryService} from '../../../history-module/service/history.service';

@Component({
  selector: 'app-view-history-point',
  templateUrl: './view-history-point.component.html',
  styleUrls: ['./view-history-point.component.css']
})
export class ViewHistoryPointComponent implements OnInit {
  totalPages = 1;
  indexPage = 1;
  id: number;
  type: string;
  notify = '';
  histories: History[];
  form: FormGroup;
  constructor(private route: ActivatedRoute, private historyService: HistoryService,
              private toastr: ToastrService, private titleService: Title) {
  }

  ngOnInit(): void {
    this.id = 1;
    this.form = new FormGroup( {
      beginDate: new FormControl('', [Validators.required, checkValidDate]),
      endDate: new FormControl('', [Validators.required, checkValidDate]),
      typeView: new FormControl('', [Validators.required])
    });
    this.titleService.setTitle('Xem lịch sử điểm');
  }
  get beginDate() {
    return this.form.get('beginDate');
  }
  get endDate() {
    return this.form.get('endDate');
  }
  get typeView() {
    return this.form.get('typeView');
  }

  submit() {
    if (this.form.valid) {
      if (this.typeView.value === 'reward') {
        this.type = 'reward';
        this.historyService.getTotalPagesPointReward(this.id, this.beginDate.value, this.endDate.value).subscribe(
          t => this.totalPages = t === 0 ? 1 : t
        );
        this.findHistoriesPointReward();
      } else if (this.typeView.value === 'exchange') {
        this.type = 'exchange';
        this.historyService.getTotalPagesPointExchange(this.id, this.beginDate.value, this.endDate.value).subscribe(
          t => this.totalPages = t === 0 ? 1 : t
        );
        this.findHistoriesPointExchange();
      }
    }
  }

  findHistoriesPointExchange() {
    this.historyService.getHistoriesPointExchange(this.id, this.beginDate.value, this.endDate.value, this.indexPage - 1)
      .subscribe(histories => {
        if (histories.length === 0) {
          this.toastr.warning('Không tìm thấy lịch sử điểm.', 'Thông báo');
          this.notify = 'Không tìm thấy lịch sử điểm.';
        } else { this.notify = ''; }
        this.histories = histories;
      });
  }

  findHistoriesPointReward() {
    this.historyService.getHistoriesPointReward(this.id, this.beginDate.value, this.endDate.value, this.indexPage - 1)
      .subscribe(histories => {
        if (histories.length === 0) {
          this.toastr.warning('Không tìm thấy lịch sử điểm.', 'Thông báo');
          this.notify = 'Không tìm thấy lịch sử điểm.';
        } else { this.notify = ''; }
        this.histories = histories;
      });
  }

  findHistories() {
    if (this.type === 'reward') {
      this.findHistoriesPointReward();
    } else if (this.type === 'exchange') {
      this.findHistoriesPointExchange();
    }
  }

  firstPage() {
    this.indexPage = 1;
    if (this.type === 'reward') {
      this.findHistories();
    }
  }

  lastPage() {
    this.indexPage = this.totalPages;
    this.findHistories();
  }

  previousPage() {
    if (this.indexPage > 1) {
      this.indexPage = this.indexPage - 1;
      this.findHistories();
    }
  }

  nextPage() {
    if (this.indexPage < this.totalPages) {
      this.indexPage = this.indexPage + 1;
      this.findHistories();
    }
  }
}

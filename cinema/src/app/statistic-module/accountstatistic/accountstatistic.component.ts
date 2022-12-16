import { Component, OnInit } from '@angular/core';
import {StatisticAccount} from '../../model/statistic-account';
import {AccountStatisticService} from '../service/account-statistic.service';
import * as Chart from 'chart.js';
// import * as Chart from 'chart.js';

@Component({
  selector: 'app-accountstatistic',
  templateUrl: './accountstatistic.component.html',
  styleUrls: ['./accountstatistic.component.css']
})
export class AccountstatisticComponent implements OnInit {

  statisticAccounts: StatisticAccount[] = [];
  changeStatistics = true;
  sum = 0;
  totalPriceAccount = 0;

  constructor(private accountStatisticService: AccountStatisticService) { }

  public canvas: any;
  public ctx: any;
  public labels: any = this.statisticAccounts;
  public dataCases: any = {
    label: 'Points',
    chart: [],
  };

  totalPage: number[] = [];
  pageNumber = 0;

  ngOnInit(): void {
    this.accountStatisticService.getTotalPriceAccount().subscribe(a => {
      this.totalPriceAccount = a;
      this.accountStatisticService.getAccountStatisticPage(0).subscribe(
        (data: any) => {
          this.statisticAccounts = data.content;
          this.setPage(data.totalPages);
          for (let i = 0; i < this.statisticAccounts.length; i++) {
            this.labels[i] = this.statisticAccounts[i].fullName;
            this.dataCases.chart[i] = this.statisticAccounts[i].money;
            this.totalPriceAccount -= this.statisticAccounts[i].money;
          }
          console.log(this.totalPriceAccount);
          this.labels[5] = 'residual';
          this.dataCases.chart[5] = this.totalPriceAccount;
          this.createLineChart1(this.labels, this.dataCases, 'myChart1');
        }
      );
    });
  }

  // Chart
  private createLineChart1(labels, dataCases, chartId) {
    this.canvas = document.getElementById(chartId);
    this.ctx = this.canvas.getContext('2d');

    const chart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Chart 1',
          data: dataCases.chart,
          backgroundColor: ['#ffbb33', '#e67e22', '#16a085', '#2980b9', '#2f7532', '#E50815'],
          fill: true,
          borderWidth: 2
        }]
      },
      options: {
        cutoutPercentage: 50,
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },

      }
    });
  }

  onStatistics() {
    this.sum = 0;
    // tslint:disable-next-line:prefer-for-of
    this.statisticAccounts.forEach( a => {
      this.sum += a.money;
    });
    this.changeStatistics = this.changeStatistics;
  }

  // Phân trang
  setPage(totalPage: number) {
    this.totalPage = new Array(totalPage);
  }

  previousPage() {
    if (this.pageNumber <= 0) {
      alert('Không thể chuyển qua trang trước!');
    } else {
      this.pageNumber -= 1;
      this.showAccount(this.pageNumber);
    }
  }

  changePageNumber(i: number) {
    this.pageNumber = i;
    this.showAccount(this.pageNumber);
  }

  nextPage() {
    if (this.pageNumber === this.totalPage.length) {
      alert('Không thể chuyển qua trang sau!');
    } else {
      this.pageNumber += 1;
      this.showAccount(this.pageNumber);
    }
  }

  private showAccount(page: number) {
    page = this.pageNumber;
    this.accountStatisticService.getAccountStatisticPage(page).subscribe((data: any ) => {
      this.statisticAccounts = data.content;
    });

  }

}

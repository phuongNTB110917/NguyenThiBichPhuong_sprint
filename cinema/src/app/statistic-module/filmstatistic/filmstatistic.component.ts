import { Component, OnInit } from '@angular/core';
import {StatisticFilm} from '../../model/statistic-film';
import {FilmStatisticService} from '../service/film-statistic.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-filmstatistic',
  templateUrl: './filmstatistic.component.html',
  styleUrls: ['./filmstatistic.component.css']
})
export class FilmstatisticComponent implements OnInit {

  statisticFilms: StatisticFilm[] = [];
  changeStatistic = false;
  sum = 0;
  topFive: StatisticFilm[] = [];
  totalPrice = 0;

  constructor(private filmStatisticService: FilmStatisticService) { }

  public canvas: any;
  public ctx: any;
  public labels: any = this.statisticFilms;
  public dataCases: any = {
    label: 'Points',
    chart1: [],
  };

  totalPage: number[] = [];
  pageNumber = 0;

  ngOnInit(): void {
    this.filmStatisticService.getTotalPrice().subscribe(t => {
      this.totalPrice = t;
      this.filmStatisticService.getFilmStatisticPage(0).subscribe(
        (data: any) => {
          this.statisticFilms = data.content;
          this.topFive = [];
          this.setPage(data.totalPages);
          for (let i = 0; i < this.statisticFilms.length; i++) {
            this.labels[i] = this.statisticFilms[i].name;
            this.dataCases.chart1[i] = this.statisticFilms[i].money;
            this.totalPrice -= this.statisticFilms[i].money;
          }
          console.log(this.totalPrice);
          this.labels[5] = 'residual';
          this.dataCases.chart1[5] = this.totalPrice;
        }
      );
    });
    console.log(this.totalPage);
    this.createLineChart(this.labels, this.dataCases, 'myChart');
  }

  // Chart
  private createLineChart(labels, dataCases, chartId) {
    this.canvas = document.getElementById(chartId);
    this.ctx = this.canvas.getContext('2d');

    const chart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Chart 1',
          data: dataCases.chart1,
          backgroundColor: ['#ffbb33', '#e67e22', '#16a085', '#2980b9', '#3f000f', '#E50815'],
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

  onStatistic() {
    this.sum = 0;
    // tslint:disable-next-line:prefer-for-of
    this.statisticFilms.forEach( s => {
      this.sum += s.money;
    });
    this.changeStatistic = !this.changeStatistic;
  }

  setPage(totalPage: number) {
    this.totalPage = new Array(totalPage);
  }

  previousPage() {
    if (this.pageNumber <= 0) {
      alert('Không thể chuyển qua trang trước!');
    } else {
      this.pageNumber -= 1;
      this.showFilm(this.pageNumber);
    }
  }

  changePageNumber(i: number) {
    this.pageNumber = i;
    this.showFilm(this.pageNumber);
  }

  nextPage() {
    if (this.pageNumber === this.totalPage.length) {
      alert('Không thể chuyển qua trang sau!');
    } else {
      this.pageNumber += 1;
      this.showFilm(this.pageNumber);
    }
  }

  private showFilm(page: number) {
    page = this.pageNumber;
    this.filmStatisticService.getFilmStatisticPage(page).subscribe((data: any ) => {
      this.statisticFilms = data.content;
    });
  }

}

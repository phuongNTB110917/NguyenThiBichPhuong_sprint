import {Component, OnInit} from '@angular/core';
import {Film} from '../../model/film';
import {FilmService} from '../service/film.service';
import {FormGroup, FormControl} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer} from '@angular/platform-browser';
import {CategoryFilm} from '../../model/category-film';
import { Category } from 'src/app/model/category';


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  indexPagination = 1;
  totalPages: number;

  constructor(private filmService: FilmService, private toastr: ToastrService, private sanitizer: DomSanitizer ) {
  }

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    actor: new FormControl(''),
  });
  films: Film[];
  id: number;
  name: string;
  startDate: string;
  actor: string;
  director: string;
  duration: string;
  studioName: string;
  categoryFilms: [];
  nameSearch = '';
  trailer: string;
  content: string;
  version: string;
  img: string;
  ngOnInit(): void {
    this.getAllWithPage();
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getAllWithPage() {
    this.filmService.getAllFilmsWithPage(this.indexPagination).subscribe(page => {
      this.films = page.content;
      this.totalPages = page.totalPages;
      this.indexPagination = page.number + 1;
    });
  }

  firstPage() {
    this.indexPagination = 1;
    this.onSearch();
  }

  lastPage() {
    this.indexPagination = this.totalPages;
    this.onSearch();
  }

  previousPage() {
    if (this.indexPagination > 1) {
      this.indexPagination = this.indexPagination - 1;
      this.onSearch();
    }
  }

  nextPage() {
    if (this.indexPagination < this.totalPages) {
      this.indexPagination = this.indexPagination + 1;
      this.onSearch();
    }
  }

  deleteFilm(id: number | any) {
    if (this.films.length === 1) {
      this.indexPagination--;
    }
    this.filmService.deleteFilm(id).subscribe(
      data => {
        this.toastr.success('Đã xoá phim thành công!!!', 'Thông báo');
        this.onSearch();
      },
      error => {
        this.toastr.error('Đã xoá phim thất bại!!!', 'Thông báo');
      }
    );
  }

  findFilmDeleteById(name: string | any, id: number | any) {
    this.name = name;
    this.id = id;
  }

  onSearch() {
    if (this.nameSearch !== this.searchForm.value.name) {
      this.nameSearch = this.searchForm.value.name;
      this.indexPagination = 1;
    }
    this.filmService.search(this.searchForm.value.name, this.indexPagination).subscribe(page => {
      if (page) {
        this.films = page.content;
        this.totalPages = page.totalPages;
        this.indexPagination = page.number + 1;
      } else {
        this.indexPagination = 1;
        this.totalPages = 1;
        this.films = [];
        this.toastr.warning('Không có dữ liệu tìm kiếm !!!', 'Thông báo');
      }
    });
  }
  findFilmDetailById(id: number, name: string, startDate: string, studioName: string, categoryFilms: [],
                     director: string, actor: string, duration: string, trailer: string, content: string,
                     version: string, img: string) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.studioName = studioName;
    this.categoryFilms = categoryFilms;
    this.director = director;
    this.actor = actor;
    this.duration = duration;
    this.trailer = trailer + '?autoplay=1';
    this.content = content;
    this.version = version;
    this.img = img;
  }
}

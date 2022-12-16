import { Component, OnInit } from '@angular/core';
import {FilmService} from '../service/film.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Film} from '../../model/film';

@Component({
  selector: 'app-flim-list',
  templateUrl: './flim-list.component.html',
  styleUrls: ['./flim-list.component.css']
})
export class FlimListComponent implements OnInit {
  indexPagination = 1;
  totalPages: number;

  constructor(private filmService: FilmService) {
  }

  searchForm: FormGroup = new FormGroup({
    // tslint:disable-next-line:max-line-length
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\\d ]*$')]),
    // tslint:disable-next-line:max-line-length
    actor: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\\d ]*$')])
  });
  films: Film[];
  name: string;
  id: number;
  nameSearch = '';

  ngOnInit(): void {
    this.getAllWithPage();
  }

  getAllWithPage() {
    this.filmService.getAllFilmsWithPage(this.indexPagination).subscribe(page => {
      this.films = page.content;
      console.log(page.content);
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

  onSearch() {
    if (this.nameSearch !== this.searchForm.value.name)  {
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
      }
    });
  }

}

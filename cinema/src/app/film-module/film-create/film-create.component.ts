import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FilmService} from '../service/film.service';
import {Category} from '../../model/category';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-film-create',
  templateUrl: './film-create.component.html',
  styleUrls: ['./film-create.component.css']
})
export class FilmCreateComponent implements OnInit {
  select = false;

  constructor(private filmService: FilmService, private toastr: ToastrService, private router: Router,
              private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
  }

  formFilm: FormGroup;
  categoryList: Category[];
  // tslint:disable-next-line:ban-types
  filmName: String;
  // tslint:disable-next-line:variable-name
  validation_messages = {
    name: [
      {type: 'required', message: 'Vui lòng nhập tên phim.'},
      {type: 'pattern', message: 'Nhập tên phim không hợp lệ, không được chứa kí tự đặc biệt. (abc, abc xyz)'},
      {type: 'minlength', message: 'Tên phim nhập tối thiểu 3 kí tự.'},
      {type: 'maxlength', message: 'Tên phim nhập tối đa 50 kí tự.'}
    ],
    actor: [
      {type: 'required', message: 'Vui lòng nhập tên diễn viên.'},
      {
        type: 'pattern',
        message: 'Nhập tên diễn viên không hợp lệ, không được chứa kí tự đặc biệt và số. (abc, abc xyz)'
      },
      {type: 'minlength', message: 'Tên diễn viên nhập tối thiểu 3 kí tự.'},
      {type: 'maxlength', message: 'Tên diễn viên nhập tối đa 50 kí tự.'}
    ],
    startDate: [
      {type: 'required', message: 'Vui lòng nhập ngày bắt đầu.'}
    ],
    endDate: [
      {type: 'required', message: 'Vui lòng nhập kết thúc.'}
    ],
    studioName: [
      {type: 'required', message: 'Vui lòng nhập tên hãng phim.'},
      {type: 'pattern', message: 'Tên hãng phim không hợp lệ, không được chứa kí tự đặc biệt  (abc, abc xyz)'},
      {type: 'minlength', message: 'Tên hãng phim nhập tối thiểu 3 kí tự.'},
      {type: 'maxlength', message: 'Tên hãng phim nhập tối đa 50 kí tự.'}
    ],
    director: [
      {type: 'required', message: 'Vui lòng nhập tên đạo diễn.'},
      {type: 'pattern', message: 'Tên đạo diễn không hợp lệ, không được chứa kí tự đặc biệt  (abc, abc xyz)'},
      {type: 'minlength', message: 'Tên đạo diễn nhập tối thiểu 3 kí tự.'},
      {type: 'maxlength', message: 'Tên đạo diễn nhập tối đa 50 kí tự.'}
    ],
    duration: [
      {type: 'required', message: 'Vui lòng thời lượng của phim. (đơn vị phút)'},
      {type: 'pattern', message: 'Nhập thời lượng không hợp lệ.'},
      {type: 'minlength', message: 'Thời lượng nhập tối thiểu 1 kí tự số.'},
      {type: 'maxlength', message: 'Thời lượng nhập tối đa 6 kí tự.'}
    ],
    trailer: [
      {type: 'required', message: 'Vui lòng nhập Url trailer phim'}
    ],
    content: [
      {type: 'required', message: 'Vui lòng nội dung của phim.'},
      {type: 'minlength', message: 'Thời lượng nhập tối thiểu 3 kí tự số.'},
      {type: 'maxlength', message: 'Thời lượng nhập tối đa 255 kí tự.'}
    ],
    img: [
      {type: 'required', message: 'Vui lòng nhập Url hình ảnh phim'}
    ],
  };
  idEdit = 0;
  ngOnInit() {
    this.getAllListCategory();
    this.formFilm = this.fb.group({
      id: [''],
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;]*$/),
        Validators.minLength(3), Validators.maxLength(50)]],
      startDate: ['', [Validators.required]],
      endDate: ['', Validators.required],
      // tslint:disable-next-line:max-line-length
      actor: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\|\.|\>|\?|\/|\""|\;|\'1']*$/),
        Validators.minLength(3), Validators.maxLength(255)]],
      // tslint:disable-next-line:max-line-length
      director: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\|\.|\>|\?|\/|\""|\;|\'1']*$/),
        Validators.minLength(3), Validators.maxLength(50)]],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]{1,6}$'),
        Validators.minLength(1), Validators.maxLength(6)]],
      trailer: ['', Validators.required],
      studioName: ['', [Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;]*$/),
        Validators.minLength(3), Validators.maxLength(50)]],
      content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(2040)]],
      img: ['', [Validators.required]],
      version: ['2D'],
      categories: this.fb.array([]),
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idEdit = Number(paramMap.get('id'));
      // tslint:disable-next-line:triple-equals
      if (this.idEdit != 0) {
        this.filmService.findById(this.idEdit).subscribe(s => {
          this.formFilm.patchValue(s);
          this.formFilm.get('startDate').setValue(formatDate(s.startDate, 'yyyy-MM-dd', 'en'));
          this.formFilm.get('endDate').setValue(formatDate(s.endDate, 'yyyy-MM-dd', 'en'));
        });
      }
    });
  }

  getAllListCategory() {
    this.filmService.getAllCategory().subscribe((categories) => {
      // @ts-ignore
      this.categoryList = categories;
    });
  }


  add() {
    if (this.idEdit === 0) {
      let idCategoryFilm: number;
      const array = document.getElementsByName('checkType');
      const arr = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < array.length; i++) {
        if ((array[i] as HTMLInputElement).checked) {
          const obj = (array[i] as HTMLInputElement).value;
          arr.push(obj);
          break;
        }
      }
      this.formFilm.value.categories = arr;
      this.filmName = this.formFilm.value.name;
      this.filmService.getNumberOfReCordOfCategoryFilm().subscribe(r => {
        // @ts-ignore
        idCategoryFilm = (r + 1);
      });
      this.filmService.add(this.formFilm.value).subscribe(film => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < arr.length; i++) {
            this.filmService.addCategoryFilm(idCategoryFilm, arr[i], film.id).subscribe(r => {
            });
            idCategoryFilm += 1;
          }
          this.router.navigateByUrl('/film/list');
          this.toastr.success('Đã thêm mới phim thành công!!!', 'Thông báo');
        },
        () => {
          this.toastr.error('Đã thêm mới phim thất bại!!!', 'Thông báo');
        });
    } else {
      let idCategoryFilm: number;
      const array = document.getElementsByName('checkType');
      const arr = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < array.length; i++) {
        if ((array[i] as HTMLInputElement).checked) {
          const obj = (array[i] as HTMLInputElement).value;
          arr.push(obj);
        }
      }
      this.formFilm.value.categories = arr;
      this.filmName = this.formFilm.value.name;
      this.filmService.getNumberOfReCordOfCategoryFilm().subscribe(r => {
        // @ts-ignore
        idCategoryFilm = (r + 1);
      });

      this.filmService.update(this.formFilm.value.id, this.formFilm.value).subscribe(films => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < arr.length; i++) {
            this.filmService.addCategoryFilm(idCategoryFilm, arr[i], films.id).subscribe(r => {
            });
            idCategoryFilm += 1;
          }
          this.router.navigateByUrl('/film/list');
          this.toastr.success('Đã cập nhật phim thành công!!!', 'Thông báo');
        },
        () => {
          this.toastr.error('Đã cập nhật phim thất bại!!!', 'Thông báo');
        });
    }
  }

  onSubmit() {
    this.add();
  }

  onCheckChange(e: any) {
    const categories: FormArray = this.formFilm.get('categories') as FormArray;
    if (e.target.checked) {
      categories.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      categories.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          categories.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}

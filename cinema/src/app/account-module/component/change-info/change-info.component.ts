import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../service/account.service';
import {validateDate} from '../../validator/validateDate';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {
  title = 'Thông báo';
  id: number;
  form: FormGroup;
  currentDate: Date = new Date();
  isEmailExist = false;
  emailOld: string;

  constructor(private route: ActivatedRoute, private accountService: AccountService,
              private toastr: ToastrService, private titleService: Title) {

  }

  get fullname() {
    return this.form.get('fullname');
  }

  get gender() {
    return this.form.get('gender');
  }

  get birthday() {
    return this.form.get('birthday');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }

  get idCard() {
    return this.form.get('idCard');
  }

  get address() {
    return this.form.get('address');
  }

  // tslint:disable-next-line:variable-name
  validation_messages = {
    fullname: [
      {type: 'required', message: 'Vui lòng nhập họ tên.'},
      {type: 'maxlength', message: 'Vui lòng nhập tên không quá 100 kí tự.'},
      {type: 'pattern', message: 'Vui lòng nhập tên không chứa kí tự đặc biệt.'}
    ],
    birthday: [
      {type: 'ageInvalid', message: 'Tuổi phải nằm trong khoảng từ 12-80 tuổi.'},
      {type: 'formatDateOfBirthInvalid', message: 'Ngày sinh vừa nhập không đúng định dạng yyyy-mm-dd.'}
    ],
    email: [
      {type: 'required', message: 'Vui lòng nhập email.'},
      {type: 'email', message: 'Vui lòng nhập email đúng định dạng abc@gmail.com.'}
    ],
    idCard: [
      {type: 'required', message: 'Vui lòng nhập chứng minh nhân dân.'},
      {type: 'pattern', message: 'Vui lòng nhập CMND từ 9 đến 12 kí tự số.'},
    ],
    phone: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại'},
      {type: 'pattern', message: 'Vui lòng nhập số điện thoại đúng định dạng (09 | 03 | 07 | 08 | 05)XX XXX XXX.'}
    ],
    address: [
      {type: 'maxlength', message: 'Vui lòng nhập địa chỉ tối đa 50 kí tự.'}
    ],
  };

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      fullname: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        // tslint:disable-next-line:max-line-length
        Validators.pattern('^[\\s]*[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ ]+)*$')
      ]),
      password: new FormControl(''),
      username: new FormControl(''),
      birthday: new FormControl('', [validateDate]),
      gender: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      idCard: new FormControl('', [
        Validators.required,
        // tslint:disable-next-line:max-line-length
        Validators.pattern('^\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]?\\s*[0-9]?\\s*[0-9\\s*]?\\s*$')
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\s*0(3|5|7|8|9)\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*$')
      ]),
      address: new FormControl('', [
        Validators.maxLength(50),
      ])
    });
    // get id into storage service
    this.id = 1;

    this.accountService.findById(this.id).subscribe(ac => {
      this.emailOld = ac.email;
      this.form.patchValue(ac);
    });
    this.titleService.setTitle('Đổi thông tin tài khoản');
  }

  update() {
    if (this.form.valid) {
      this.fullname.setValue(this.fullname.value.replace(/\s+/g, ' ').trim());
      this.birthday.setValue(this.birthday.value);
      this.gender.setValue(this.gender.value);
      this.email.setValue(this.email.value);
      this.idCard.setValue(this.idCard.value.replace(/\s+/g, '').trim());
      this.phone.setValue(this.phone.value.replace(/\s+/g, '').trim());
      this.address.setValue(this.address.value.replace(/\s+/g, ' ').trim());
      if (this.emailOld !== this.email.value) {
        this.accountService.checkExistEmail(this.email.value).subscribe(c => {
          this.isEmailExist = c;
          if (this.isEmailExist) {
            this.toastr.warning('Email đã tồn tại trong hệ thống !!!', this.title);
          } else { this.save(); }
        });
      } else { this.save(); }
    } else {
      this.toastr.warning('Thông tin trong form không hợp lệ !!!', this.title);
    }
  }

  save() {
    this.accountService.updateInfo(this.id, this.form.value).subscribe(
      data => {
        this.form.patchValue(data);
        this.toastr.success('Cập nhật thành công !!!', this.title);
      },
      error => {
        this.toastr.error('Cập nhật thông tin thất bại !!!', this.title);
      }
    );
    this.isEmailExist = false;
  }
}

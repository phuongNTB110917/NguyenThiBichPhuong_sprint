import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../service/account.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountServiceService} from '../service/account-service.service';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent implements OnInit {
  accountForm: FormGroup;
  account: Account;
  isChecked = false;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) {
    this.accountForm = new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      // confirmPassword: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('((09|03|07|08|05)([0-9]{8})\\b)')]),
      idCard: new FormControl('', [Validators.required, Validators.pattern('^\\d{9,12}$')]),
      birthday: new FormControl(''),
      gender: new FormControl(''),
      address: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  saveAccount() {
    console.log(this.accountForm.value);
    if (this.accountForm.valid) {
      if (this.isChecked === false) {
        this.toastr.warning('Vui lòng đọc kĩ điều khoản !!!');
        return;
      }
      this.accountService.addAccount(this.accountForm.value).subscribe(next => {
        this.toastr.success('Đăng ký thành công');
      }, e => {
        console.log();
        this.toastr.error('Thông tin không hợp lệ');
      });
    } else {
      this.toastr.warning('Thông tin không hợp lệ.');
    }
  }

  updateCheckbox() {
    this.isChecked = !this.isChecked;
  }
}

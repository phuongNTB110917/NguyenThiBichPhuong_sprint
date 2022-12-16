import {Component, ElementRef, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AccountService} from '../../service/account.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private accountService: AccountService,
              private toast: ToastrService, private el: ElementRef, private titleService: Title) {
    this.form = new FormGroup({
      accountCode: new FormControl({value: '', disable: true}),
      username: new FormControl({value: '', disable: true}),
      oldPass: new FormControl('', [Validators.required]),
      pwGroup: new FormGroup({
        newPass: new FormControl('', [Validators.required]),
        confirmPass: new FormControl( '', [Validators.required])
      }, this.comparePassword),
    });
  }

  get oldPass() {
    return this.form.get('oldPass');
  }

  get pwGroup() {
    return this.form.get('pwGroup');
  }

  get newPass() {
    return this.form.get('pwGroup').get('newPass');
  }

  get confirmPass() {
    return this.form.get('pwGroup').get('confirmPass');
  }
  id: number;
  form: FormGroup;
  isValidOldPass = true;

  validationMessages = {
    oldPass: [
      {type: 'required', message: 'Vui lòng nhập mật khẩu cũ.'},
    ],
    newPass: [
      {type: 'required', message: 'Vui lòng nhập mật khẩu mới.'},
    ],
    confirm: [
      {type: 'required', message: 'Vui lòng xác nhận mật khẩu.'},
    ],
    pwGroup: [
      {type: 'passwordNotMatch', message: 'Mật khẩu xác nhận không trùng khớp.'}
    ]
  };

  ngOnInit(): void {
    // get id into storage service
    this.id = 1;
    // nếu storage service có username rồi thì ko cần findById vì id, username có trong window
    this.accountService.findById(this.id).subscribe(ac => {
      this.form.patchValue({
        accountCode: ac.accountCode,
        username: ac.username
      });
    });
    this.titleService.setTitle('Đổi mật khẩu');
  }

  comparePassword( c: AbstractControl) {
    const v = c.value;
    return (v.newPass === v.confirmPass) ?
      null : {
        passwordNotMatch: true
      };
  }

  changePassword() {
    if (this.form.valid) {
      this.accountService.changePassword(this.id, this.oldPass.value, this.newPass.value).subscribe(
        data => {
          this.isValidOldPass = true;
          this.toast.success('Đổi mật khẩu thành công !!!', 'Thông báo');
        },
        error => {
          this.isValidOldPass = false;
          this.toast.error('Đổi mật khẩu thất bại !!!', 'Thông báo');
        }
      );
    } else {
      if (this.form.get('pwGroup').hasError('passwordNotMatch')) {
        const invalidControl = this.el.nativeElement.querySelector('#confirm-password-input');
        invalidControl.focus();
      }
      this.toast.warning('Thông tin trong form không hợp lệ.', 'Thông báo');
    }
  }

  togglePass(idToggle: string, idInputPass: string) {
    const toggle = this.el.nativeElement.querySelector(idToggle);
    const pass = this.el.nativeElement.querySelector(idInputPass);
    const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
    pass.setAttribute('type', type);
    toggle.classList.toggle('bi-eye-slash');
    toggle.classList.toggle('bi-eye');
  }
}

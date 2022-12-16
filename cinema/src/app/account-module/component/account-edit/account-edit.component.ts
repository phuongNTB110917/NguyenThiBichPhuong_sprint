import { Component, OnInit } from '@angular/core';
import {Account} from '../../../model/account';
import {AccountRole} from '../../../model/account-role';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountServiceService} from '../../service/account-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {validateDate} from '../../validator/validateDate';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  constructor(private accountService: AccountServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(paramMap.get('id'));
      this.getAccount(this.id);
    });
  }
  account: Account = new class implements Account {
    id: number;
    isEnabled: boolean;
    username: string;
    accountCode: string;
    password: string;
    fullname: string;
    birthday: any;
    idCard: string;
    address: string;
    phone: string;
    verificationCode: string;
    email: string;
    gender: string;
    totalPoint: number;
    imageUrl: string;
    account_role_test: AccountRole;
  };

  id: number;

  editForm: FormGroup;

  public showPassword: boolean;

  // tslint:disable-next-line:variable-name
  validation_messages = {
    fullname: [
      {type: 'required', message: 'Vui lòng nhập họ tên.'},
      {type: 'maxlength', message: 'Vui lòng nhập tên không quá 100 kí tự.'},
      {type: 'pattern', message: 'Vui lòng nhập tên không chứa kí tự đặc biệt.'}
    ],
    birthday: [
      {type: 'required', message: 'Vui lòng chọn ngày sinh.'},
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
      {type: 'required', message: 'Vui lòng nhập địa chỉ'},
      {type: 'maxlength', message: 'Vui lòng nhập địa chỉ tối đa 50 kí tự.'}
    ],
  };

  get fullname() {
    return this.editForm.get('fullname');
  }

  get birthday() {
    return this.editForm.get('birthday');
  }

  get email() {
    return this.editForm.get('email');
  }

  get phone() {
    return this.editForm.get('phone');
  }

  get idCard() {
    return this.editForm.get('idCard');
  }

  get address() {
    return this.editForm.get('address');
  }

  ngOnInit(): void {
  }

  getAccount(id: number) {
    this.accountService.findById(id).subscribe(account => {
      this.editForm = new FormGroup({
        id: new FormControl(account.id),

        username: new FormControl(account.username),

        fullname: new FormControl(account.fullname, [
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern('^[\\s]*[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ ]+)*$')
        ]),

        password: new FormControl(account.password),

        birthday: new FormControl(account.birthday, [
          Validators.required,
          validateDate
        ]),

        email: new FormControl(account.email, [
          Validators.required,
          Validators.email
        ]),

        idCard: new FormControl(account.idCard, [
            Validators.required,
            Validators.pattern('^\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]?\\s*[0-9]?\\s*[0-9\\s*]?\\s*$')
        ]),

        phone: new FormControl(account.phone, [
          Validators.required,
          Validators.pattern('^\\s*0(3|5|7|8|9)\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*$')
        ]),

        address: new FormControl(account.address, [
          Validators.required,
          Validators.maxLength(50)
        ])
      });
    });
  }

  editAccount(id: number) {
    const account = this.editForm.value;
    this.accountService.edit(id, account).subscribe(() => {
      this.toastr.success('Sửa thành công');
      this.router.navigateByUrl('/account/list');
    }, error => {
      this.toastr.error('Sửa không thành công');
    });

  }

  onSubmit() {
    this.editAccount(this.id);
  }
}

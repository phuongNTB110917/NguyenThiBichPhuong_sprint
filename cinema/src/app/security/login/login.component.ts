import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {TokenStorageService} from '../service/token-storage-service.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  username: string;
  errorMessage = '';
  roles: string[] = [];
  returnUrl: string;


  constructor(
    private formBuild: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    this.formGroup = this.formBuild.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(
      data => {
        this.toastr.success('Đăng nhâp thành công');
        // console.log(data.token);
        this.tokenStorageService.saveTokenLocal(data.token);
        // this.tokenStorageService.saveUserLocal(data);
        this.authService.isLoggedIn = true;
        // this.username = this.tokenStorageService.getUser().username;
        // this.roles = this.tokenStorageService.getUser().roles;
        this.formGroup.reset();
        this.router.navigateByUrl('/account/list');
      },
      err => {
        this.authService.isLoggedIn = false;
        this.toastr.error('Đăng nhâp thất bại');
        this.formGroup.reset();
        this.router.navigateByUrl('/security/login');
      }
    );
  }

}

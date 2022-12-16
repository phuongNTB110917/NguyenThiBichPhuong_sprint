import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  id: number;
  // tslint:disable-next-line:max-line-length
  imageDefault = 'https://mpng.subpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg';
  imageAccount;
  totalPoint = 0;
  form: FormGroup;
  fullName = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    // Lấy id bên storageService
    this.id = 1;
    this.accountService.findById(this.id).subscribe(ac => {
      if (ac.totalPoint !== null) {
        this.totalPoint = ac.totalPoint;
      }
      this.imageAccount = ac.imageUrl;
      this.form = new FormGroup({
        fullname: new FormControl()
      });
      this.form.patchValue(ac);
      this.fullName = this.form.get('fullname').value;
    });
  }

  updateUrl($event: ErrorEvent) {
    this.imageAccount = this.imageDefault;
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  isSuccessful = false;
  isSendMail = false;
  constructor(private route: ActivatedRoute,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params.code;
      if (code == null) {
        this.isSendMail = false;
      } else {
        this.isSendMail = true;
        this.authService.verify(code).subscribe(
          data => {
            console.log(data.message);
            this.isSuccessful = (data.message === 'activated');
          },
          err => {
            this.isSuccessful = false;
          }
        );
      }
      console.log(code); // Print the parameter to the console.
    });
  }

}

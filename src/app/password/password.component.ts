import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';

import { LoginService } from 'app/pages/login/login.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  oldpass: boolean = false;
  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  focusOutFunction(val) {
    let data = {
      id: localStorage.getItem('AdminId'),
      pass: val,
      role: localStorage.getItem('role')
    }
    debugger
    this.loginService.CheckPassword(data).subscribe((res: any) => {
      debugger
      if (res.length >= 1) {
        this.oldpass = false;
      }
      else {
        this.oldpass = true;
      }
    })
  }

  updatePassword(val){
    let data = {
      id: localStorage.getItem('AdminId'),
      role: localStorage.getItem('role'),
      password: val
    };
    this.loginService.changePassword(data).subscribe((req) => {
      localStorage.clear();
      this.apiService.showNotification('top', 'right', 'Password changed Successfully. Login with new Password', 'success');
      this.router.navigate(['/pages/login']);
    })
  }
}

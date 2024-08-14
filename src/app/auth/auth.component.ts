import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  
userName: string = ''

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'
    )]),
    password: new FormControl(null, [Validators.required, Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )])
  })
  
  constructor(
    private _AuthService:AuthService, 
    private _router:Router,
    private toastr: ToastrService 
  ){}


  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') ?? ''

  }
  onLogin(data: FormGroup){
    this._AuthService.login(data.value).subscribe({
      next:(res)=>{
        //For login: checking for role
        localStorage.setItem('userToken', res.token);
        this._AuthService.getProfile();

      },
      error:(err:HttpErrorResponse) => {
        this.toastr.error(err.error.message, "Error");
      },
      complete:() =>{
        this.toastr.success(`Welcome back ${this.userName}`, 'Success');
        this._router.navigate(['dashboard']);
      }
    })
  }

}

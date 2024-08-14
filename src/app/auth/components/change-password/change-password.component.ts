import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  
  constructor(
    private _AuthService:AuthService, 
    private _router:Router,
    private toastr: ToastrService 
  ){}

  
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),

    newPassword: new FormControl(null, [Validators.required, Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )]),
    
    confirmPassword: new FormControl(null, [
      Validators.required,
      this.passwordMatchValidator.bind(this),
    ]),
    
  })

  
  // Password and confirm password Match Function
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const confirmPassword = control.value;
    const password = this.changePasswordForm?.get('newPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  sendChangedPassowrd(): void {
    const data = this.changePasswordForm.value;

    if(this.changePasswordForm.valid){
      this._AuthService.changePassword(data).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error:(err:HttpErrorResponse)=>{
          this.toastr.error(err.error.message, "Error")
        },
        complete:()=>{
          this.toastr.info('Password changed successfully');
          this._router.navigate(["/auth"]);
        }
      })
    }
  }

}

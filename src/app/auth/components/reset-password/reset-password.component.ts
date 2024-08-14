import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

    
  constructor(
    private _AuthService:AuthService, 
    private _router:Router,
    private toastr: ToastrService 
  ){}

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'
    )]),
    password: new FormControl(null, [Validators.required, Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )]),
    
    confirmPassword: new FormControl(null, [
      Validators.required,
      this.passwordMatchValidator.bind(this),
    ]),
    seed: new FormControl(null, [Validators.required])
  })

  
  // Password and confirm password Match Function
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const confirmPassword = control.value;
    const password = this.resetPasswordForm?.get('password')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onResetPassword(): void{
    const data = this.resetPasswordForm.value;

    if(this.resetPasswordForm.valid){
      this._AuthService.resetPassword(data).subscribe({
        next: (res) =>{
          console.log(res);
        },
        error: (err:HttpErrorResponse) =>{
          this.toastr.error(err.error.message, "Error");
        },
        complete: () =>{
          this.toastr.info('Password has changed successfully');
          this._router.navigate(['/auth']);
        }
      })
    }

  }


}

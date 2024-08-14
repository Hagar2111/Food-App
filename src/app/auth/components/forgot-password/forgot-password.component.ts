import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  
  constructor(
    private _AuthService:AuthService, 
    private _router:Router,
    private toastr: ToastrService 
  ){}


  requestForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'
    )]),
    
  })

  
  sendRequestForm(): void {
    const data = this.requestForm.value;
    
    if (this.requestForm.valid) {
      this._AuthService.requestToChangePassword(data).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err.error.message, "Error");
        },
        complete: ()=>{
          this.toastr.info('please, check your Email' )
          this._router.navigate(["/auth/resetpassword"], { queryParams: { email: data["email"] } });
        }
      })
    }

  }
}

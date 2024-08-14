import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  
  constructor(
    private _AuthService:AuthService, 
    private _router:Router,
    private toastr: ToastrService 
  ){}

  verifyForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'
    )]),
    
    code: new FormControl(null, [Validators.required])
  })

  
  onVerify(): void{
    const data = this.verifyForm.value;

    if(this.verifyForm.valid){
      this._AuthService.verifyUserAccount(data).subscribe({
        next: (res) =>{
          console.log(res);
        },
        error: (err:HttpErrorResponse) =>{
          this.toastr.error(err.error.message, "Error");
        },
        complete: () =>{
          this.toastr.info('Account verified successfully');
          this._router.navigate(['dashboard']);
        }
      })
    }

  }
}

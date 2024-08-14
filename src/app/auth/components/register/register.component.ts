import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  imgSrc:any;

  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z]?[a-z]{3,10}[0-9]{2}$'),Validators.minLength(5), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'
    )]),
    country: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z]{2,10}$'),Validators.minLength(3), Validators.maxLength(10)]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')] ), //Egyptian number
    profileImage: new FormControl(null),
    password: new FormControl(null, [Validators.required, Validators.pattern(
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
    const password = this.registerForm?.get('password')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  hide:boolean = true;

  constructor(
    private _AuthService:AuthService, 
    private _router:Router,
    private toastr: ToastrService 
  ){}

  
  onRegister(data: FormGroup){

    // let myData = new FormData()

    let myData = new FormData();
    myData.append('profileImage', this.imgSrc);

    const fields = ['userName', 'email', 'country', 'phoneNumber', 'password', 'confirmPassword'];

    for (const field of fields) {
        myData.append(field, data.value[field]);
    }

  this._AuthService.register(data.value).subscribe({
    next: (res) => {
      console.log(res);
    },
    error: (err: HttpErrorResponse) => {
      this.toastr.error(err.error.message, "Error");
    },
    complete: ()=>{
      this.toastr.info('You signed up successfully' )
      this._router.navigate(["/auth"]);
    }
  })
  }

  files: File[] = [];

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  
    this.imgSrc = this.files[0];
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IProfileData, IUserDetails } from '../../../auth/models/auth';
import { IUserResponse } from '../../../admin/users/models/users';
import { Router } from '@angular/router';
import { VerifyComponent } from '../../../auth/components/verify/verify.component';
import { ProfileService } from '../../services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})

export class UpdateProfileComponent {

  files: File[] = [];
  onView: boolean = true;
  hideConfirm: boolean = true;
  BaseUrl = "https://upskilling-egypt.com:3006/";
  emptyImge:string= '../../../../assets/imgs/emptyUser.png'
  image!: File;
  imgSrc:any;
  profileForm!: FormGroup;
  // userName!: string;
  // imagePath:string='';
  // imgEdit:string=''
  // profileDataResponse:IUserDetails={
  //   id: 0,
  //   userName: '',
  //   email: '',
  //   country: '',
  //   phoneNumber: '',
  //   imagePath: '',
  //   creationDate: '',
  //   modificationDate: '',
  //   group: {
  //     id: 0,
  //   name: '',
  //   creationDate: '',
  //   modificationDate: '',
  //   }
    
  // }

  // profileData:any;
  // profileData:IProfileData= {
  //   userName: '',
  //   email: '',
  //   country: '',
  //   phoneNumber: '',
  //   profileImage: '',
  //   confirmPassword:'',
  // }

  constructor(private _AuthService:AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _Router:Router   
  ){}

  ngOnInit(): void {

    const DefaultValidators = [Validators.required];
    const userNameValidators = [...DefaultValidators, 
    Validators.pattern('^[A-Z]?[a-z]{3,10}[0-9]{2}$')
  ]
    const PhoneNumberValidators = [...DefaultValidators, 
    Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')
  ]
    const EmailValidators = [...DefaultValidators, 
      Validators.email, 
      Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'
    )];
    const PasswordValidators = [...DefaultValidators, 
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')
    ];

    this.profileForm = new FormGroup({
      userName: new FormControl('', userNameValidators),
      email: new FormControl('', EmailValidators),
      country: new FormControl('', DefaultValidators),
      phoneNumber: new FormControl('', PhoneNumberValidators),
      confirmPassword: new FormControl('', PasswordValidators),
      profileImage: new FormControl(null)
    })

    this.getProfile();
}



getProfile(){
  this._AuthService.getCurrentUser().subscribe({
    next: (res) => {
      this.profileForm.patchValue(res);

      this.imgSrc =  this.BaseUrl + res.imagePath;
    },
    error: (err: HttpErrorResponse) => {
            this.toastr.error(err.error.message, "Error");
          },
  })
}


onSubmit(): void {
  const data = new FormData();

  for (let key in this.profileForm.value) {
    if (key === "profileImage") continue;
    data.append(key, this.profileForm.value[key]);
  }

  if (this.image) data.append("profileImage", this.image);

  if (this.profileForm.valid) {
    this._AuthService.updateUserProfile(data).subscribe({
      next: (res) => {
        //console.log(res)
      },
      error: (err: HttpErrorResponse) => {
              this.toastr.error(err.error.message, "Error");
      },
      complete: ()=>{
            this.toastr.info('Your profile is updated successfully' )
            this._Router.navigate(["../dashboard/home"]);
      }
    })
  }
}


toggleEdit(){
  this.onView = !this.onView;
}
  
  
  
  onSelect(event: any) {
    if(this.onView) return;

    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        // this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    this.image = files[0];
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.imgSrc = reader.result; 
    }
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}

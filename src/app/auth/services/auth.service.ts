import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ILogin, ILoginResponse, IPasswordChanged, IProfileData, IRegister, IResetPassword, IUserDetails, IUserFiltration, IUserVerify, IUsers } from '../models/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role:string ='';

  constructor(
    private _HttpClient:HttpClient,
    private _Router:Router
  ) { 

    //For Refreshing
  
    if(localStorage.getItem('userToken') !== null){
      this.getProfile();
    }
  }

  
  getProfile(){
    let encoded:any = localStorage.getItem('userToken');
    let decoded:any = jwtDecode(encoded);
    localStorage.setItem('role', decoded.userGroup );
    localStorage.setItem('userName',decoded.userName);
    this.getRole();
  }
  getRole(){
    if(localStorage.getItem('userToken') !== null && localStorage.getItem('role') !== null){

      this.role = localStorage.getItem('role')?? " ";
    }
  }

  login(loginData: ILogin): Observable<ILoginResponse> {
    return this._HttpClient.post<ILoginResponse>('Users/Login', loginData);
  }

  register(registrationData: IRegister): Observable<{ message: string }> {
    return this._HttpClient.post<{ message: string }>('Users/Register', registrationData);
  }

  verifyUserAccount(verificationData: IUserVerify): Observable<{ message: string }> {
    return this._HttpClient.put<{ message: string }>('Users/verify', verificationData);
  }

  creatingAdmin(adminData: IRegister): Observable<{ message: string }> {
    return this._HttpClient.post<{ message: string }>('Users/Create', adminData);
  }
  deleteUser(userId: number): Observable<{ message: string }> {
    return this._HttpClient.delete<{ message: string }>(`Users/${userId}`);
  }
 
  changePassword(passwordData: IPasswordChanged): Observable<{ message: string }> {
    return this._HttpClient.put<{ message: string }>('Users/ChangePassword', passwordData)
  }
  requestToChangePassword(requestEmail: string):  Observable<{ message: string }>{
    return this._HttpClient.post<{ message: string }>('Users/Reset/Request', requestEmail)
  }
  resetPassword(passwordData: IResetPassword): Observable<{ message: string }> {
    return this._HttpClient.post<{ message: string }>('users/Reset', passwordData);
  }
  getUser(userId: number): Observable<IUserDetails> {
    return this._HttpClient.get<IUserDetails>(`Users/${userId}`);
  }
  getCurrentUser(): Observable<IUserDetails> {
    return this._HttpClient.get<IUserDetails>('Users/CurrentUser');
  }
  getAllUsers(usersParams: IUserFiltration): Observable<IUsers> {
    return this._HttpClient.get<IUsers>('Users', { params: usersParams })
  }

  updateUserProfile(updateData: FormData): Observable<IUserDetails> {
    return this._HttpClient.put<IUserDetails>('Users', updateData);
  }
  
  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this._Router.navigate(['/auth']);
  }

}

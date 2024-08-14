import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAllUsers, IAllUsersResponse, IUserResponse } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient:HttpClient) { }

  getAllUsers(myParams:any):Observable <IAllUsersResponse>{
    return this._HttpClient.get<IAllUsersResponse>('Users', {params:myParams})
  }
  
  getUserById(id:number):Observable<IUserResponse>{
    return this._HttpClient.get<IUserResponse>(`Users/${id}`);
  }
  
  onDeleteUser(id:number):Observable<{message:string}>{
    return this._HttpClient.delete<{message:string}>(`User/${id}`)
  }


}

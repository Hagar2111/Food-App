import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

interface IRole {
  isActive: boolean;
  text: string;
  textButton: string;
  link: string;
  content: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName: string = '';

  constructor(private _AuthService:AuthService){}

  
  // Check if user is admin
  isAdmin(): boolean {
    return this._AuthService.role == 'SuperAdmin' ? true : false;
  }

  // Check if user is regular user
  isUser(): boolean {
    return this._AuthService.role == 'SystemUser' ? true : false;
  }

  // Array to store roles with their details
  role: IRole[] = [
    {
      text: 'Fill The',
      textButton: 'Fill Recipe',
      link: '/dashboard/admin/recipes',
      isActive: this.isAdmin(), // Check if user is admin
      content:
        'you can now fill the meals easily using the table and form , click here and sill it with the table !',
    },
    {
      text: 'Show All',
      textButton: 'Recipes',
      link: '/dashboard/user/user-recipes',
      isActive: this.isUser(), // Check if user is regular user
      content:
        'you can now show the meals easily using this button, click here and sill it with the table !',
    },
  ];

  ngOnInit() {
    // Retrieve user name from local storage or set default value
    this.userName = localStorage.getItem('userName') ?? 'Upskilling';
  }
}

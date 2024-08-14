import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SidebarService } from './services/sidebar.service';


interface IMenu{
  text:string;
  icon:string;
  link:string;
  isActive:boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  
  @Input() collapse!: boolean
  // isExpanded: boolean = false;

  constructor(
    private _AuthServise:AuthService,
    private _sidebarService:SidebarService
  ){}
  
  toggleSidebar(): void {
    // this.isExpanded = !this.isExpanded;
    this._sidebarService.toggleSidebar(!this._sidebarService.isExpandedSubject.value);
  }

//this._AuthServise.role == 'SuperAdmin';
isAdmin():boolean{
  return this._AuthServise.role == 'SuperAdmin'? true : false
}
isUser():boolean{
  return this._AuthServise.role == 'SystemUser'? true : false
}


onLogout() {
  this._AuthServise.logout();
}


  menu: IMenu[] = [
    {
      text:'Home',
      icon: 'fa-solid fa-home',
      link:'/dashboard/home',
      isActive: this.isAdmin() || this.isUser()
    },
    {
      text:'Users',
      icon: 'fa-solid fa-users',
      link:'/dashboard/admin/users',
      isActive: this.isAdmin()
    },
    {
      text:'ِAll Recipes',
      icon: 'fa-solid fa-bowl-rice',
      link:'/dashboard/admin/recipes',
      isActive: this.isAdmin()
    },
    {
      text:'Categories',
      icon: 'fa-solid fa-layer-group',
      link:'/dashboard/admin/categories',
      isActive: this.isAdmin()
    },
    {
      text:'Recipes',
      icon: 'fa-solid fa-bowl-rice',
      link:'/dashboard/user/user-recipes',
      isActive: this.isUser()
    },
    {
      text:'Favourites',
      icon: 'fa-regular fa-heart',
      link:'/dashboard/user/favorites',
      isActive: this.isUser()
    }
  ]
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  

  collapseCol: boolean = true;

  
  toggleSidebar():void{
    this.collapseCol = !this.collapseCol
  }
}

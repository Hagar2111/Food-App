import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Property to track the state of the sidebar collapse
  // sidebarCollapsed: boolean = false;

  // Method to handle the sidebar collapse event
  // onToggleSidebar(data: boolean) {
  //   this.sidebarCollapsed = data;
  //   console.log(data)
  // }
  

  collapseCol: boolean = true;

  
  toggleSidebar():void{
    this.collapseCol = !this.collapseCol
  }
}

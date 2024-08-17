import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { CategoriesService } from '../categories/services/categories.service';
import { RecipesService } from '../recipes/services/recipes.service';
import { UsersService } from './services/users.service';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  
  baseUrl:string = "https://upskilling-egypt.com:3006/";
  emptyImg:string = "../../../assets/imgs/emptyUser.png";
  pageSize: number =10;
  pageNumber: number =1;
  categoryItem:string = '';
  listData:any;
  listTags:any[] = [];
  listCategories:any[] = [];
  searchValue:string ='';
  parameterKey: string = '';
  roleIds:number[] =[];
  categoryId:number =0;
  noDataFound:boolean=false;

  // data:any;

  constructor(
    private _UsersService:UsersService, 
    private _CategoriesService:CategoriesService, 
    private _RecipesService:RecipesService, 
    private _ToastrService:ToastrService,
    public dialog: MatDialog
  ){
    this.getUsersData();
  
  }

  getUsersData(){

    let paramData = {
      // name: this.searchValue,
      // tagId:this.tageId,
      // categoryId:this.categoryId,

      [this.parameterKey]:this.searchValue,
      groups:this.roleIds,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    }


    this._UsersService.getAllUsers(paramData).subscribe({
      next:(res) => {
        this.listData = res;
        if(this.listData.totalNumberOfRecords==0)
          { this.noDataFound = true
          console.log('empty')
        } else  
        this.noDataFound=false;
       
    },error: (error: HttpErrorResponse) =>
      this._ToastrService.error(error.error.message, 'Error'),
    complete: () =>
      this._ToastrService.success(
        'Users were successfully retrieved.',
        'Success'
      ),
  })
}


  openViewUserDialog(userData:any): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data:userData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      
      if(result){
        this.onDeleteItem(result);
      }
    });
  }

  openDeleteDialog(id:number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {itemId: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      
      if(result){
        this.onDeleteItem(result);
      }
    });
  }


  onDeleteItem(id:number){
    this._UsersService.onDeleteUser(id).subscribe({
      next:(res) => {
        console.log(res)
      },error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () =>
        this._ToastrService.success(
          'The item deleted successfully.'),
    })
  }

  
  handlePageEvent(e: PageEvent) {
   
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getUsersData();
  }
}

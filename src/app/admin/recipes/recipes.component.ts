import { Component } from '@angular/core';
import { RecipesService } from './services/recipes.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { IAllRecipesResponse, IrecipesData, ITag } from './models/recipes';
import { ICategory, ICategoryDataResponse, ICategoryRequestParams } from '../categories/models/categories';
import { CategoriesService } from '../categories/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  
  pageSize: number =10;
  pageNumber: number =0;
  showPageSizeOptions = true;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;
  noDataFound:boolean=false;
  

  imgUrl:string='https://upskilling-egypt.com:3006/'
  emptyImage:string='../../../assets/imgs/logo-no-text.svg'

  searchValue :string= '';
  tagId:number=0
  categoryId:number=0;  


 allRecipes!:IAllRecipesResponse
 allTags!:ITag[]

 categoryList: ICategoryDataResponse = {
  pageNumber: 0,
  pageSize: 0,
  data: [],
  totalNumberOfPages: 0,
  totalNumberOfRecords: 0,
};
 
 constructor(
  private _RecipesService:RecipesService,
  private _CategoriesService:CategoriesService,
  private dialog: MatDialog,
  private _ToastrService: ToastrService){
}

categoriesIsEmpty:boolean=false

ngOnInit(): void {
  this.getRecipesData()
  this.getTags()
  this.onGetCategories()
  
}


getRecipesData():void{

  let ParamData={
    name:this.searchValue,
    tagId:this.tagId,
    categoryId:this.categoryId,
    pageSize:this.pageSize,
    pageNumber:this.pageNumber + 1
  }

  this._RecipesService.getAllRecipes(ParamData).subscribe({
    next:(res)=>{
      this.allRecipes=res;
      console.log(this.allRecipes);
      if(this.allRecipes.totalNumberOfRecords==0)
        { this.noDataFound = true
        console.log('empty')
      } else  
      this.noDataFound=false;
      
    },error: (error: HttpErrorResponse) =>
      this._ToastrService.error(error.error.message, 'Error'),
    complete: () =>
      this._ToastrService.success(
        'The items were successfully retrieved.',
        'Success'
      ),
  })
}


getTags():void{

  this._RecipesService.getAllTags().subscribe({
    next:(res)=>{
      console.log(res)
     
      this.allTags=res;

    },error: (error: HttpErrorResponse) =>
      this._ToastrService.error(error.error.message, 'Error'),
    complete: () =>
      this._ToastrService.success(
        'The items were successfully retrieved.',
        'Success'
      ),
  })
}


onGetCategories() {
  let requestParams: ICategoryRequestParams = {
    name: this.searchValue,
    pageSize: this.pageSize,
    pageNumber: this.pageSize / this.pageNumber + 1,
  };
  this._CategoriesService.getOrFilterCategories(requestParams).subscribe({
    next: (res:ICategoryDataResponse) => {
      this.categoryList = res;
      if(this.categoryList.totalNumberOfRecords == 0)
        { 
        this.noDataFound = true
        console.log('empty')
      } else {
        this.noDataFound=false;
      }
    },
    error: (error: HttpErrorResponse) =>
      this._ToastrService.error(error.error.message, 'Error'),
    complete: () =>
      this._ToastrService.success(
        'The items were successfully retrieved.',
        'Success'
      ),
  });
}
reset():void{
  this.searchValue=''
  this.getRecipesData()
}


deleteItem(id:number):void{

  this._RecipesService.onDeleteRecipe(id).subscribe({
    next:(res)=>{
      console.log(res)
    },error: (error: HttpErrorResponse) =>
      this._ToastrService.error(error.error.message, 'Error'),
    complete: () => {
      this._ToastrService.success('Item Deleted Successfully', 'Success');
      this.onGetCategories();
    },
  })

}


openDeleteRecipeDialog(recipeId: number) {
  this._RecipesService.getRecipeById(recipeId).subscribe({
    next: (res) => {
      const dialogRef = this.dialog.open(DeleteComponent, {
        
        data: { name: res.name },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteItem(result);
        }
      });
    },
  });
}


  
onOpenViewRecipeDialog(recipeId: number) {
  this._RecipesService.getRecipeById(recipeId).subscribe({
    next: (response) => {
      const dialogRef = this.dialog.open(ViewRecipeComponent, {
        
        data: response
      })

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      })
    }
  })
}
  onPageChange(e: any) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getRecipesData();
  }
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}

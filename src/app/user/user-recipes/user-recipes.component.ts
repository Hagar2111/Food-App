import { Component } from '@angular/core';
import { RecipesService } from '../../admin/recipes/services/recipes.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { IAllRecipesResponse, IrecipesData, ITag } from '../../admin/recipes/models/recipes';
import { ICategory, ICategoryDataResponse, ICategoryRequestParams } from '../../admin/categories/models/categories';
import { CategoriesService } from '../../admin/categories/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { FavoritesService } from '../favorites/services/favorites.service';
import { IFavResponseData } from '../favorites/models/favorites';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent {

  pageSize: number =10;
  pageNumber: number =0;
  showPageSizeOptions = true;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;
  noDataFound:boolean=false;
  favList:IFavResponseData[] = []

  

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
  private _ToastrService: ToastrService,
private _FavoritesService:FavoritesService){
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
    pageSize: this.pageNumber,
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

iconClass = 'fa-regular fa-heart';
  
toggleIconClass() {
 
  // Toggle between 'fa-solid' and 'fa-regular'
  this.iconClass = this.iconClass === 'fa-solid fa-heart' ? 'fa-regular fa-heart' : 'fa-solid fa-heart';
}

handleFavHeart(id:number) {
  this.toggleIconClass();
  setTimeout(()=>{
    this.onAddToFav(id)
  }, 1000);
  
}


onAddToFav(id:number){
  this._FavoritesService.onAddFavRecipe(id).subscribe({
    next:(res) =>{
      console.log(res);
    },
    error: (error: HttpErrorResponse) =>
      this._ToastrService.error(error.error.message, 'Error'),
    complete: () =>
      this._ToastrService.success(
        'Recipe successfully added to your favourites.',
        'Success'
      ),
      
  })
}


getAllFav():void{

  this._FavoritesService.getAllFavRecipes().subscribe({
    next: (res)=>{
      console.log(res);
      this.favList = res.data;
    },
    
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

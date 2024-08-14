import { Component } from '@angular/core';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from './services/favorites.service';
import { IFavResponseData } from './models/favorites';
import { HttpErrorResponse } from '@angular/common/http';
import { RecipesService } from 'src/app/admin/recipes/services/recipes.service';
import { ViewRecipeComponent } from '../user-recipes/components/view-recipe/view-recipe.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  constructor(
    private _FavoritesService:FavoritesService,
    public dialog: MatDialog, 
    private _RecipesService:RecipesService,
    private _ToastrService:ToastrService
  ){}

  ngOnInit(){
    this.getAllFav();
  }

  //vars
  favList:IFavResponseData[] = []
  imgUrl:string= 'https://upskilling-egypt.com:3006/'
  emptyImge:string= '../../../assets/imgs/logo-no-text.svg'
  noDataFound:boolean=false;

  
  getAllFav():void{

    this._FavoritesService.getAllFavRecipes().subscribe({
      next: (res)=>{
        console.log(res);
        this.favList = res.data;
        console.log(this.favList);

        if(res.totalNumberOfRecords==0)
          { this.noDataFound = true
          console.log('empty')
        } else  
        this.noDataFound=false;
      },
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () =>
        this._ToastrService.success(
          'Your Favourites are successfully retrieved.',
          'Success'
        ),
    })
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

  
  openDialogDelete(id:number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {itemId: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.deleteFromFav(result)
    });
  }

  
  deleteFromFav(id:number):void{
    this._FavoritesService.onDeleteFavRecipe(id).subscribe({
      next:(res)=>{
        this._ToastrService.success('Recipe Deleted From Favourites Successfully')
      },
      error:(err)=>{
        this._ToastrService.error(err.error.message)
      },
      complete:()=>{
        this.getAllFav();
      }
    })
  }
}

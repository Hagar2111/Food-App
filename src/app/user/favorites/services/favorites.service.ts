import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAllFavResponse, IFavRecipeResponse } from '../models/favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private _HttpClient:HttpClient) { }


  getAllFavRecipes():Observable <IAllFavResponse>{
    return this._HttpClient.get<IAllFavResponse>('userRecipe')
  }
    
  onAddFavRecipe(id:number):Observable <IFavRecipeResponse>{
    return this._HttpClient.post<IFavRecipeResponse>('userRecipe', {recipeId:id})
  }
    
  onDeleteFavRecipe(id:number):Observable <any>{
    return this._HttpClient.delete(`userRecipe/${id}`)
  }

}

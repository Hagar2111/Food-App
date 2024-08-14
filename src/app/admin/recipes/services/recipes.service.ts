import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAllRecipesResponse, IgetAndFilterRecipes } from '../models/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllRecipes(myParams:any):Observable <IAllRecipesResponse>{
    return this._HttpClient.get<IAllRecipesResponse>('Recipe', {params:myParams})
  }
  
  getRecipeById(id:number):Observable <any>{
    return this._HttpClient.get(`Recipe/${id}`)
  }
  
  onAddRecipe(data:FormData):Observable<string>{
    return this._HttpClient.post<string>('Recipe', data)
  }
  
  onEditRecipe(data:FormData, id:number):Observable<any>{
    return this._HttpClient.put(`Recipe/${id}`, data)
  }
  
  onDeleteRecipe(id:number):Observable<any>{
    return this._HttpClient.delete(`Recipe/${id}`)
  }
  
  getAllTags():Observable <any>{
    return this._HttpClient.get('tag')
  }
  
  
  addToFav(id :number):Observable<any>{
    return this._HttpClient.post(`userRecipe`,{recipeId:id})
  }

  removeFromFav(id :number):Observable<any>{
    return this._HttpClient.delete(`userRecipe/${id}`)
  }


  getAllFav():Observable<any>{
    return this._HttpClient.get('userRecipe')
  }

}

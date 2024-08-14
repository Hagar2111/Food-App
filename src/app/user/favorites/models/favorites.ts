import { IrecipesData } from "src/app/admin/recipes/models/recipes";

export interface IAllFavResponse {
    pageNumber:number;
    pageSize:number;
    data:IFavResponseData[];
    totalNumberOfRecords:number;
    totalNumberOfPages:number;
}
export interface IFavResponseData{
    id:number;
    creationDate:string;
    modificationDate:string;
    recipe: IrecipesData;
    totalNumberOfRecords:number;
    totalNumberOfPages:number;
}

export interface IFavRecipeResponse{
    recipe:IrecipesData;
    user:IFavRecipeUser;
    id:number;
    creationDate:string;
    modificationDate:string;
}
export interface IFavRecipeUser{
    id:number;
}

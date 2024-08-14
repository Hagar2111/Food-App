import { ICategory } from "../../categories/models/categories";

export interface IAllRecipesResponse {
    pageNumber:number;
    pageSize:number;
    data:IrecipesData[];
    totalNumberOfRecords:number;
    totalNumberOfPages:number;
}

export interface IrecipesData{
    id: number
    name: string
    imagePath: string
    description: string
    price: number
    creationDate: string
    modificationDate: string
    category: ICategory[]
    tag: ITag
}

export interface ITag {
    id: number
    name: string
    creationDate: string
    modificationDate: string
  }
  
  export interface IgetAndFilterRecipes{
    name?: string
    tagId?:number
    categoryId?:number
    pageSize:number
    pageNumber: number
  }

  export interface IAllFav {
    pageNumber: number
    pageSize: number
    data: IFav[]
    totalNumberOfRecords: number
    totalNumberOfPages: number
  }
  
  export interface IFav {
    id: number
    creationDate: string
    modificationDate: string
    recipe: IrecipesData
  }

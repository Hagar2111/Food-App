import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, ICategoryDataResponse, ICategoryRequestParams } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient: HttpClient) {}

  // Method to create a new category
  createCategory(categoryName: string): Observable<ICategory> {
    return this._HttpClient.post<ICategory>('Category', categoryName);
  }

  // Method to get categories or filter categories based on request parameters
  getOrFilterCategories(categoryRequestParams: ICategoryRequestParams): Observable<ICategoryDataResponse> {
    return this._HttpClient.get<ICategoryDataResponse>('Category', { params: categoryRequestParams });
  }

  // Method to get a single category by its ID
  getSingleCategory(categoryId: number): Observable<ICategory> {
    return this._HttpClient.get<ICategory>(`Category/${categoryId}`);
  }

  // Method to delete a category by its ID
  deleteCategory(categoryId: number): Observable<{ raw: [], affected: number }> {
    return this._HttpClient.delete<{ raw: [], affected: number }>(`Category/${categoryId}`);
  }

  // Method to update a category by its ID
  updateCategory(categoryId: number, categoryData: string): Observable<ICategory> {
    return this._HttpClient.put<ICategory>(`Category/${categoryId}`, categoryData);
  }
}

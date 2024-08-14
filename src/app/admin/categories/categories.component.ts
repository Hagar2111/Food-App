import { Component } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ToastrService } from 'ngx-toastr';
import {
  ICategoryDataResponse,
  ICategoryRequestParams,
} from './models/categories';
import { HttpErrorResponse } from '@angular/common/http';
// import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
// import { ViewCategoryComponent } from './components/view-category/view-category.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  first: number = 1;
  rows: number = 10;
  showPageSizeOptions = true;
  pageSizeOptions = [5, 10, 25];
  searchValue: string = '';
  myControl = new FormControl();
  filteredCategories: any[] = [];
  categories: any[] = [];
  noDataFound:boolean=false;

  // Main header text will be passed to the main-shared component
  headerText: string = 'Categories';

  // Text header content will be passed to the main-shared component
  headerTextContent: string = 'Item';

  // Main content text will be passed to the main-shared component
  textContent: string =
    'You can now add your items that any user can order it from the Application and you can edit';

  categoryList: ICategoryDataResponse = {
    pageNumber: 0,
    pageSize: 0,
    data: [],
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
  };

  constructor(
    private _CategoriesService: CategoriesService,
    private _ToastrService: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onGetCategories();
    this.filteredCategories = this.categories;
    this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      )
      .subscribe((filteredCategories) => {
        this.filteredCategories = filteredCategories;
      });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.categoryList.data.filter((category) =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  resetSearch(){
    this.searchValue = ''; 
    this.onGetCategories();
  }

  onGetCategories() {
    let requestParams: ICategoryRequestParams = {
      name: this.searchValue,
      pageSize: this.rows,
      pageNumber: this.first / this.rows + 1,
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

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      data: { edit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onCreateCategory(result);
      }
    });
  }

  onCreateCategory(categoryData: string) {
    this._CategoriesService.createCategory(categoryData).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this._ToastrService.success('Category Created Successfully', 'Success');
        this.onGetCategories();
      },
    });
  }

  onDeleteCategory(categoryId: number) {
    this._CategoriesService.deleteCategory(categoryId).subscribe({
      next: (res:{ raw: [], affected: number }) => {  },
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this._ToastrService.success('Item Deleted Successfully', 'Success');
        this.onGetCategories();
      },
    });
  }

  
  openDeleteCategoryDialog(categoryId: number) {
    this._CategoriesService.getSingleCategory(categoryId).subscribe({
      next: (res) => {
        const dialogRef = this.dialog.open(DeleteComponent, {
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          maxWidth: '100%',
          data: { name: res.name },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.onDeleteCategory(categoryId);
          }
        });
      },
    });
  }

  openEditCategoryDialog(categoryId: number) {
    this._CategoriesService.getSingleCategory(categoryId).subscribe({
      next: (res) => {
        const dialogRef = this.dialog.open(AddEditCategoryComponent, {
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          maxWidth: '100%',
          data: { name: res.name, edit: true },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.onUpdateCategory(categoryId, result);
          }
        });
      },
    });
  }

  onUpdateCategory(categoryId: number, updatedName: string) {
    this._CategoriesService.updateCategory(categoryId, updatedName).subscribe({
      next: () => {  },
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this._ToastrService.success('Category Updated Successfully', 'Success');
        this.onGetCategories();
      },
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.onGetCategories();
  }
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onOpenViewCategoryDialog(categoryId: number) {
    this._CategoriesService.getSingleCategory(categoryId).subscribe({
      next: (response) => {
        const dialogRef = this.dialog.open(ViewCategoryComponent, {
          height: '100%',
          width: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          data: response
        })

        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
        })
      }
    })
  }
}

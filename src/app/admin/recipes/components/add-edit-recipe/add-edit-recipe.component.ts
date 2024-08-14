import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { CategoriesService } from '../../../categories/services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IrecipesData, ITag } from '../../models/recipes';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ICategory, ICategoryDataResponse, ICategoryRequestParams } from 'src/app/admin/categories/models/categories';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent {
  addRecipeForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    recipeImage: new FormControl(null),
    categoriesIds: new FormControl(null)
  });

   //vars
   
  first: number = 1;
  rows: number = 10;
  showPageSizeOptions = true;
  pageSizeOptions = [5, 10, 25];
  searchValue: string = '';
  noDataFound:boolean=false;

  categoryList: ICategoryDataResponse = {
    pageNumber: 0,
    pageSize: 0,
    data: [],
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
  };

 allTags!:ITag[]
 allCategories:any = {
    id: 0,
    name:'',
    creationDate:'',
    modificationDate:''
 }
 imgBaseUrl:string='https://upskilling-egypt.com:3006/';
 imgNeededToEdit:string='';
 emptyImage:string='./assets/img/no-recipce.jpg';
 recipecId:number=0;
recipecNeedEdit!:IrecipesData;
imageUploaded: boolean = false;
imageUrl: string = '';
uploadedFile!: File ; // Property to store the uploaded file
 categoriesIsEmpty:boolean=false

 constructor(
  private _Router:Router ,  
  private _RecipesService:RecipesService,
  private _CategoriesService:CategoriesService,
  private _ToastrService: ToastrService, 
  private _ActivatedRoute:ActivatedRoute)  { }

addRecipceForm: FormGroup=new FormGroup({
  name:new FormControl('',[Validators.required]),
  description:new FormControl('',[Validators.required]),
  price:new FormControl('',[Validators.required]),
  tagId:new FormControl('',[Validators.required]),
  categoriesIds:new FormControl('',[Validators.required]),  
  recipeImage:new FormControl(''),

})

ngOnInit(): void {
  this.getTags()
  this.onGetCategories()

 this.recipecId= this._ActivatedRoute.snapshot.params['id']

 if(this.recipecId){
  //edit
  this.getRecipeById(this.recipecId)

 }

}


goToRecipes():void{
  this._Router.navigate(['/dashboard/admin/recipes'])

}

msgError:string=''



sendData(data:FormGroup):void{

 if(this.recipecId){

   this.editRecipe(data)
  }else{
   console.log('add')
    
   this.addRecipe(data);

 }

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
    pageSize: this.rows,
    pageNumber: this.first / this.rows + 1,
  };
  this._CategoriesService.getOrFilterCategories(requestParams).subscribe({
    next: (res) => {
      this.categoryList = res;
      this.allCategories = res.data;
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


getRecipeById(id :number){
  this._RecipesService.getRecipeById(id).subscribe({
    next:(res)=>{
    console.log(res)
    this.recipecNeedEdit=res;
    },
    error:(err)=>{
     console.log(err)
    },complete:()=>{

     let categoryIds:number[]=[];
      for(let i=0;i<this.recipecNeedEdit.category.length;i++){
        categoryIds.push(this.recipecNeedEdit.category[i].id)
      }

      this.addRecipceForm.patchValue({   
    name:this.recipecNeedEdit.name,
    description:this.recipecNeedEdit.description,
    price:this.recipecNeedEdit.price,
    tagId:this.recipecNeedEdit.tag.id,
    categoriesIds:categoryIds,  

   // recipeImage:this.recipecNeedEdit.imagePath,
      })

      if(this.recipecNeedEdit.imagePath){
        this.imgNeededToEdit=this.imgBaseUrl+this.recipecNeedEdit.imagePath

      }

    }
  })
}


editRecipe(data: FormGroup): void {
  if (this.uploadedFile !== null && this.addRecipceForm.valid) {
    
    let myData = new FormData();

    const fields = ['name', 'description', 'price', 'tagId', 'categoriesIds', 'phoneNumber'];

    for (const field of fields) {
        myData.append(field, data.value[field]);
    }
    
    

    if (this.uploadedFile && this.uploadedFile.name) {
      console.log("uploaded");
      myData.append('recipeImage', this.uploadedFile, this.uploadedFile.name);
      this.editFromApi(myData)

    } else {
      console.log("no file uploaded");

      // Convert the image URL to a Blob
      this.convertImageUrlToBlob( this.imgBaseUrl+ this.recipecNeedEdit.imagePath)
        .then(blob => {
          myData.append('recipeImage', blob, 'image.jpg');

          // Call your service method here
          this.editFromApi(myData)
       
        })
        .catch(error => {
          console.error("Error converting image URL to Blob:", error);
        });
    }
  }
}

// Function to convert image URL to Blob
async convertImageUrlToBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}


editFromApi(myData:FormData):void{
  this._RecipesService.onEditRecipe(myData, this.recipecId).subscribe({
    next: (res) => {
      console.log(res);
    },
    error: (error: HttpErrorResponse) =>
      this._ToastrService.error(error.error.message, 'Error'),
    complete: () =>
      this._ToastrService.success(
        'Edited Successfully'
      ),
  });
}


msg:string=''
addRecipe(data:FormGroup):void{

  if (this.uploadedFile !== null && this.addRecipceForm.valid) {

    let myData = new FormData();

    const fields = ['name', 'description', 'price', 'tagId', 'categoriesIds', 'phoneNumber'];

    for (const field of fields) {
        myData.append(field, data.value[field]);
    }

   
     
  if(this.uploadedFile && this.uploadedFile.name){
    myData.append('recipeImage', this.uploadedFile, this.uploadedFile.name);
  }

  this._RecipesService.onAddRecipe(myData).subscribe({
   next:(res)=>{
     console.log(res)
    //  this.msg=res.message
   },
   error: (error: HttpErrorResponse) =>
    this._ToastrService.error(error.error.message, 'Error'),
   complete:()=>{
      this._ToastrService.success(
        'Added Successfully'
      ),
       this._Router.navigate(['./../../dashboard/admin/recipes'])
     }

  })


 }

}

files: File[] = [];


onSelect(event:any) {
  console.log(event);
  this.files.push(...event.addedFiles);

  this.uploadedFile = this.files[0];
}

onRemove(event:any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}


}

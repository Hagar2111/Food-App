import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';


@NgModule({
  declarations: [
    RecipesComponent,
    AddEditRecipeComponent,
    ViewRecipeComponent,
    
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    NgxDropzoneModule
  ]
})
export class RecipesModule { }

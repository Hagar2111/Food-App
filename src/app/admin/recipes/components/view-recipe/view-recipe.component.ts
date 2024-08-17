import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent {

  imgUrl:string='https://upskilling-egypt.com:3006/';
  emptyImage:string='../../../../../assets/imgs/logo-no-text.svg'

  constructor(
    public dialogRef: MatDialogRef<ViewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}

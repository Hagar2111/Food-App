import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent {
  userName: string = '';

  // Initialize form group with name control
  addEditForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]), // Name control with required validator
  })

  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // Get username from local storage or set to an empty string
    this.userName = localStorage.getItem('userName') ?? '';

    // Another way to set a value to name FormControl using patchValue()
    // this.addEditForm.get('name')?.patchValue(this.data.name)
  }
}

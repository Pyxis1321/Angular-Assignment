import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Personel } from 'src/app/models/customer.model';

@Component({
  selector: 'app-edit-personel',
  templateUrl: './edit-personel.component.html',
  styleUrls: ['./edit-personel.component.css']
})
export class EditPersonelComponent {
  constructor(private dialog: MatDialogRef<EditPersonelComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fm: FormBuilder, private _snackBar: MatSnackBar) {
  }

  employeeForm = this.fm.group({
    name: new FormControl<string>(this.data.employee.name),
    surename: new FormControl<string>(this.data.employee.surename),
    email: new FormControl<string>(this.data.employee.email),
    phone_number: new FormControl<string>(this.data.employee.phone_number),
    birth_number: new FormControl<string>(this.data.employee.birth_number),
    age: new FormControl<number>(this.data.employee.age),
    personel_photo: new FormControl<string>(this.data.employee.personel_photo),
  })

  onSave(){
    if(!Number(this.employeeForm.value.age)){
      let snackBarRef = this._snackBar.open('Age must be number.', 'OK');
      return;
    }
    if(this.employeeForm.value.name && this.employeeForm.value.surename && this.employeeForm.value.email && this.employeeForm.value.phone_number &&
      this.employeeForm.value.birth_number && this.employeeForm.value.age && this.employeeForm.value.personel_photo){
      let employee: Personel = {
        personel_id: this.data.employee.personel_id,
        name: this.employeeForm.value.name,
        surename: this.employeeForm.value.surename,
        email: this.employeeForm.value.email,
        phone_number: this.employeeForm.value.phone_number,
        birth_number: this.employeeForm.value.birth_number,
        age: this.employeeForm.value.age,
        personel_photo: this.employeeForm.value.personel_photo
      }
      this.dialog.close(employee)
    }
  }

  onClose(){
    this.dialog.close(false)
  }
}

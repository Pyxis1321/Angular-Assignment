import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {
  constructor(private dialog: MatDialogRef<EditCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fm: FormBuilder, private _snackBar: MatSnackBar) {
  }
  
  customerForm = this.fm.group({
    name: new FormControl<string>(this.data.customer.name),
    surename: new FormControl<string>(this.data.customer.surename),
    email: new FormControl<string>(this.data.customer.email),
    phone_number: new FormControl<string>(this.data.customer.phone_number),
    birth_number: new FormControl<string>(this.data.customer.birth_number),
    age: new FormControl<number>(this.data.customer.age),
  })

  onSave(){
    if(!Number(this.customerForm.value.age)){
      let snackBarRef = this._snackBar.open('Age must be number.', 'OK');
      return;
    }
    if(this.customerForm.value.name && this.customerForm.value.surename && this.customerForm.value.email && this.customerForm.value.phone_number &&
      this.customerForm.value.birth_number && this.customerForm.value.age){
      let customer: Customer = {
        customer_id: this.data.customer.customer_id,
        name: this.customerForm.value.name,
        surename: this.customerForm.value.surename,
        email: this.customerForm.value.email,
        phone_number: this.customerForm.value.phone_number,
        birth_number: this.customerForm.value.birth_number,
        age: this.customerForm.value.age
      }
      this.dialog.close(customer)
    }
  }

  onClose(){
    this.dialog.close(false)
  }
}

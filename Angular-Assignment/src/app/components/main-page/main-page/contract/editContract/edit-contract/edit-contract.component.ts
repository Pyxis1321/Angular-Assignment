import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contract } from 'src/app/models/contract.model';
import { Customer, Personel } from 'src/app/models/customer.model';

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent {
  // This array would again be passed through API
  banks: Array<string> = ['ČSOB', 'VUB', 'AEGON', 'AXA']

  constructor(private dialog: MatDialogRef<EditContractComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fm: FormBuilder) {
  }
  contractForm = this.fm.group({
    customer: new FormControl<Customer>(this.data.contract.client),
    employees: new FormControl<Array<Personel>>(this.data.contract.contract_administrator),
    institution: new FormControl<string>(this.data.contract.institution),
    date_of_creation: new FormControl<Date>(this.data.contract.date_of_creation),
    validity_date: new FormControl<Date>(this.data.contract.validity_date),
    date_of_closure: new FormControl<Date>(this.data.contract.date_of_closure),
  })

  onSave() {
    if (this.contractForm.value.institution && this.contractForm.value.customer && this.contractForm.value.employees && this.contractForm.value.date_of_creation
      && this.contractForm.value.validity_date && this.contractForm.value.date_of_closure) {
        let newEmployees: Array<Personel> = [];
        for(let employee of this.contractForm.value.employees){
          newEmployees.push(employee)
      } 
        let contract: Contract = {
        registration_number: this.data.contract.registration_number,
        institution: this.contractForm.value.institution,
        client: this.contractForm.value.customer,
        contract_administrator: newEmployees,
        date_of_creation: this.contractForm.value.date_of_creation,
        validity_date: this.contractForm.value.validity_date,
        date_of_closure: this.contractForm.value.date_of_closure
      }
      this.dialog.close(contract)
    }
  }

  onClose(){
    this.dialog.close(false)
  }
}

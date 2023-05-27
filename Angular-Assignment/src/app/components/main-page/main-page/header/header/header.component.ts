import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contract } from 'src/app/models/contract.model';
import { Customer, Personel } from 'src/app/models/customer.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @Input() contracts?: Array<Contract>;
  @Input() customers?: Array<Customer>;
  @Input() personel?: Array<Personel>;
  @Output() saveContract = new EventEmitter<Contract>();
  @Output() saveCustomer = new EventEmitter<Customer>();
  @Output() saveEmployee = new EventEmitter<Personel>();

  // Banks would be pulled same way as customers and other objects
  banks: Array<string> = ['ČSOB', 'VUB', 'AEGON', 'AXA']

  id: number = 0;

  contractForm = this.fm.group({
    customer: new FormControl<Customer | null>(null),
    employees: new FormControl<Personel[] | null>(null),
    institution: new FormControl<string | null>(null),
    date_of_creation: new FormControl<Date | null>(null),
    validity_date: new FormControl<Date | null>(null),
    date_of_closure: new FormControl<Date | null>(null),
  })

  customerForm = this.fm.group({
    customer_id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
    surename: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    phone_number: new FormControl<string | null>(null),
    birth_number: new FormControl<string | null>(null),
    age: new FormControl<number | null>(null),
  })

  employeeForm = this.fm.group({
    name: new FormControl<string | null>(null),
    surename: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    phone_number: new FormControl<string | null>(null),
    birth_number: new FormControl<string | null>(null),
    age: new FormControl<number | null>(null),
    personel_id: new FormControl<number | null>(null),
	  personel_photo: new FormControl<string | null>(null)
  })

  constructor(private fm: FormBuilder,  private _snackBar: MatSnackBar) { }

  /*
    First registration_number for new contract is made
    Then a check if new contract dates fit the criteria is made, if its false message is displayed
    Lastly new Contract is created with the data from the FormGroup and emited to main-page
  */
  onSaveContract() {
    if (this.contracts) {
      let lastContract = Array.from(this.contracts.values()).pop();
      if (lastContract?.registration_number) {
        this.id = lastContract.registration_number;
      }
    }
    // Probalbly noy the best way of doing this, simple check if(this.contractForm.value) doesnt suffice 
    if (this.contractForm.value.institution && this.contractForm.value.customer && this.contractForm.value.employees && this.contractForm.value.date_of_creation
      && this.contractForm.value.validity_date && this.contractForm.value.date_of_closure) {

        if(this.contractForm.value.validity_date < this.contractForm.value.date_of_creation || 
          this.contractForm.value.date_of_closure < this.contractForm.value.validity_date){
            let snackBarRef = this._snackBar.open('Can\'t create contract, dates incorrect.', 'OK');
            return;
        }

      let contract: Contract = {
        registration_number: this.id + 1,
        institution: this.contractForm.value.institution,
        client: this.contractForm.value.customer,
        contract_administrator: this.contractForm.value.employees,
        date_of_creation: this.contractForm.value.date_of_creation,
        validity_date: this.contractForm.value.validity_date,
        date_of_closure: this.contractForm.value.date_of_closure
      }
      this.saveContract.emit(contract)
      let snackBarRef = this._snackBar.open('New contract saved.', 'OK');
    }
  }

  onSaveCustomer(){
    if (this.customers) {
      let lastCustomer = Array.from(this.customers.values()).pop();
      if (lastCustomer?.customer_id) {
        this.id = lastCustomer.customer_id;
      }
    }
    if(!Number(this.customerForm.value.age)){
      let snackBarRef = this._snackBar.open('Age must be number.', 'OK');
      return;
    }
    if(this.customerForm.value.name && this.customerForm.value.surename && this.customerForm.value.email && this.customerForm.value.phone_number &&
      this.customerForm.value.birth_number && this.customerForm.value.age){
      let customer: Customer = {
        customer_id: this.id,
        name: this.customerForm.value.name,
        surename: this.customerForm.value.surename,
        email: this.customerForm.value.email,
        phone_number: this.customerForm.value.phone_number,
        birth_number: this.customerForm.value.birth_number,
        age: this.customerForm.value.age
      }
      this.saveCustomer.emit(customer)
      let snackBarRef = this._snackBar.open('New customer saved.', 'OK');
    }
  }

  onSaveEmployee(){
    if(!Number(this.employeeForm.value.age)){
      let snackBarRef = this._snackBar.open('Age must be number.', 'OK');
      return;
    }
    if (this.personel) {
      let lastEmployee = Array.from(this.personel.values()).pop();
      if (lastEmployee?.personel_id) {
        this.id = lastEmployee.personel_id;
      }
    }
    if(this.employeeForm.value.name && this.employeeForm.value.surename && this.employeeForm.value.email && this.employeeForm.value.phone_number &&
      this.employeeForm.value.birth_number && this.employeeForm.value.age){
      let employee: Personel = {
        personel_id:  this.id + 1,
        name: this.employeeForm.value.name,
        surename: this.employeeForm.value.surename,
        email: this.employeeForm.value.email,
        phone_number: this.employeeForm.value.phone_number,
        birth_number: this.employeeForm.value.birth_number,
        age: this.employeeForm.value.age,
        personel_photo: './assets/profile.jpg'
      }
      this.saveEmployee.emit(employee)
      let snackBarRef = this._snackBar.open('New employee saved.', 'OK');
    }

  }
}

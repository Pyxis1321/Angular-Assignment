import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Contract } from 'src/app/models/contract.model';
import { Customer, Person, Personel } from 'src/app/models/customer.model';
import { PersonDetailComponent } from '../../detail/person-detail/person-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../deleteDialog/delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditContractComponent } from '../editContract/edit-contract/edit-contract.component';
import { EditCustomerComponent } from '../editCustomer/edit-customer/edit-customer.component';
import { EditPersonelComponent } from '../editPersonel/edit-personel/edit-personel.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-contract-box',
  templateUrl: './contract-box.component.html',
  styleUrls: ['./contract-box.component.css']
})
export class ContractBoxComponent {
  @Input() contracts?: Array<Contract>;
  @Input() customers?: Array<Customer>;
  @Input() personel?: Array<Personel>;
  
  @Output() deleteContract = new EventEmitter<Contract>();
  @Output() deleteCustomer = new EventEmitter<Customer>();
  @Output() deleteEmployee = new EventEmitter<Personel>();

  @Output() editContract = new EventEmitter<Contract>();
  @Output() editCustomer = new EventEmitter<Customer>();
  @Output() editEmployee = new EventEmitter<Personel>();

  @Output() searchContractCustomer = new EventEmitter<string>();
  @Output() searchContractEmployee = new EventEmitter<string>();
  @Output() searchCustomer = new EventEmitter<string>();
  @Output() searchEmployee = new EventEmitter<string>();

  shouldDelete: boolean = false;
  shouldEdit: boolean = true;


  contractSearchCustomer: string = '';
  contractSearchEmployee: string = '';
  searchCustomerString: string = '';
  searchEmployeeString: string = '';

  
  constructor(private matBottomSheet: MatBottomSheet, public dialog: MatDialog, private _snackBar: MatSnackBar, private fm: FormBuilder){
  }

  openBottomSheetCustomer(selecterCustomer: Customer){
    this.matBottomSheet.open(PersonDetailComponent, {
      data: {
        customer: selecterCustomer
      }
    });
  }

  openBottomSheetPersonel(selecterPersonel: Personel){
    this.matBottomSheet.open(PersonDetailComponent, {
      data: {
        personel: selecterPersonel
      }
    });
  }

  onDeleteContract(contract: Contract){
    const confirmation = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: {shouldDelete: this.shouldDelete}
    }, )

    confirmation.afterClosed().subscribe(result => {
      this.shouldDelete = result;
      if(this.shouldDelete){
        this.deleteContract.emit(contract)
        this._snackBar.open('Contract Deleted', 'OK')
      }
    });
  }

  onDeleteCustomer(customer: Customer){
    const confirmation = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: {shouldDelete: this.shouldDelete}
    })

    confirmation.afterClosed().subscribe(result => {
      this.shouldDelete = result;
      if(this.shouldDelete){
        this.deleteCustomer.emit(customer)
        this._snackBar.open('Customer Deleted', 'OK')
      }
    });
  }
  
  onDeleteEmployee(employee: Personel){
    const confirmation = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: {shouldDelete: this.shouldDelete}
    })

    confirmation.afterClosed().subscribe(result => {
      this.shouldDelete = result;
      if(this.shouldDelete){
        this.deleteEmployee.emit(employee)
        this._snackBar.open('Employee Deleted', 'OK')
      }
    });
  }

  onEditContract(contract: Contract){
    const confirmation = this.dialog.open(EditContractComponent, {
      width: '850px',
      data: {
        contract: contract,
        customers: this.customers,
        personel: this.personel
      }
    })
    
    confirmation.afterClosed().subscribe(result => {
      if(!result){
        return;
      }
      let editedContract: Contract = result
      this.editContract.emit(editedContract)
    });
  }

  onEditCustomer(customer: Customer){
    const confirmation = this.dialog.open(EditCustomerComponent, {
      width: '1000px',
      data: {
        customer: customer,
      }
    })

    confirmation.afterClosed().subscribe(result => {
      if(!result){
        return
      }
      let editedCustomer: Customer = result
      this.editCustomer.emit(editedCustomer)
    });
  }

  onEditEmployee(employee: Personel){
    const confirmation = this.dialog.open(EditPersonelComponent, {
      width: '1000px',
      data: {
        employee: employee,
      }
    })

    confirmation.afterClosed().subscribe(result => {
      if(!result){
        return
      }
      let editedEmployee: Personel = result
      this.editEmployee.emit(editedEmployee)
    });
  }

  onContractSearchCustomer(){
    this.searchContractCustomer.emit(this.contractSearchCustomer)
  }

  onContractSearchEmployee(){
    this.searchContractEmployee.emit(this.contractSearchEmployee)
  }

  onSearchCustomer(){
    this.searchCustomer.emit(this.searchCustomerString)
  }
  
  onSearchEmployee(){
    this.searchEmployee.emit(this.searchEmployeeString)
  }

  onDownloadContractCSV(contract: Contract){
    var data = [{
      institution: contract.institution,
      name: contract.client.name + ' ' + contract.client.surename,
      employees: contract.contract_administrator[0].name + ' ' + contract.contract_administrator[0].surename,   
      date_of_creation: contract.date_of_creation,
      date_of_validity: contract.validity_date,
      date_of_closure: contract.date_of_closure,
    }]

    let options = {
      title: 'Contact Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers:['Institution','Client name', 'Contract leader', 'Date of creation', 'Date of validity', 'Date of closure']
    }
    new ngxCsv(data, "contract", options);
  }

  onDownloadCustomerCSV(customer: Customer){
    var data = [{
      name: customer.name + ' ' + customer.surename,
      emai: customer.email,
      phone_number: customer.phone_number,
      birth_number: customer.birth_number,
      age: customer.age
    }]

    let options = {
      title: 'Customer Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers:['Name','Email', 'Phone number', 'Birth number', 'Age']
    }
    new ngxCsv(data, customer.name + ' ' + customer.surename, options);
  }

  onDownloadEmployeeCSV(employee: Personel){
    var data = [{
      employee_id: employee.personel_id,
      name: employee.name + ' ' + employee.surename,
      emai: employee.email,
      phone_number: employee.phone_number,
      birth_number: employee.birth_number,
      age: employee.age
    }]

    let options = {
      title: 'Employee Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers:['Identification Number','Name','Email', 'Phone number', 'Birth number', 'Age']
    }
    new ngxCsv(data, employee.name + ' ' + employee.surename, options);
  }


}

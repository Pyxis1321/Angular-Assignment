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

  shouldDelete: boolean = false;
  shouldEdit: boolean = true;


  constructor(private matBottomSheet: MatBottomSheet, public dialog: MatDialog, private _snackBar: MatSnackBar){
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
    })

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
}

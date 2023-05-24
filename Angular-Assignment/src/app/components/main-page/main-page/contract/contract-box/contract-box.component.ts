import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Contract } from 'src/app/models/contract.model';
import { Customer, Person, Personel } from 'src/app/models/customer.model';
import { PersonDetailComponent } from '../../detail/person-detail/person-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../deleteDialog/delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  shouldDelete: boolean = false;

  constructor(private matBottomSheet: MatBottomSheet, public dialog: MatDialog, private _snackBar: MatSnackBar){}

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
}

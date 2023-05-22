import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Contract } from 'src/app/models/contract.model';
import { Customer, Person, Personel } from 'src/app/models/customer.model';
import { PersonDetailComponent } from '../../detail/person-detail/person-detail.component';

@Component({
  selector: 'app-contract-box',
  templateUrl: './contract-box.component.html',
  styleUrls: ['./contract-box.component.css']
})
export class ContractBoxComponent {
  @Input() contracts?: Array<Contract>;
  @Input() customers?: Array<Customer>;
  @Input() personel?: Array<Personel>;

  constructor(private matBottomSheet: MatBottomSheet){}

  openBottomSheet(person: Person){
    this.matBottomSheet.open(PersonDetailComponent, {
      data: person,
    });
  }
}

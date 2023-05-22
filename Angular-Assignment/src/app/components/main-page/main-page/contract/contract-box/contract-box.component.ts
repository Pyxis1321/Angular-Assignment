import { Component, Input } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';

@Component({
  selector: 'app-contract-box',
  templateUrl: './contract-box.component.html',
  styleUrls: ['./contract-box.component.css']
})
export class ContractBoxComponent {
  @Input() contracts?: Array<Contract>;
}

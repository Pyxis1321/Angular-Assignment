import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Customer, Personel } from 'src/app/models/customer.model';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {customer: Customer, personel: Personel}) { }

  ngOnInit() {console.log(this.data.personel)}
}

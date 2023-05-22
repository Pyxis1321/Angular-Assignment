import { Component, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { Customer, Personel } from 'src/app/models/customer.model';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  passContracts: Array<Contract> = contracts
   
}

/*
  Dummy data definition, would be otherwise comming from API calls
*/

let customer1: Customer = {
  name: 'Mark',
  surename: 'Johnson',
  email: 'mark.johnson@gmail.com',
  phone_number: '+42093248234',
  birth_number: '123123/3232',
  age: 25
}

let customer2: Customer = {
  name: 'Rick',
  surename: 'Stat',
  email: 'Rick.Stat@gmail.com',
  phone_number: '+42093248234',
  birth_number: '123123/3232',
  age: 48
}
let customer3: Customer = {
  name: 'John',
  surename: 'Clarkson',
  email: 'John.Clarkson@gmail.com',
  phone_number: '+42093248234',
  birth_number: '123123/3232',
  age: 63
}

let personel1: Personel = {
  name: 'Andrew',
  surename: 'Stark',
  email: 'andrew.Stark@gmail.com',
  phone_number: '+42093248234',
  birth_number: '123123/3232',
  age: 52,
  pesonel_id: 1
}

let personel2: Personel = {
  name: 'Chris',
  surename: 'Nowgate',
  email: 'Chris.Nowgate@gmail.com',
  phone_number: '+42093248234',
  birth_number: '123123/3232',
  age: 44,
  pesonel_id: 2
}
  
let contract1: Contract = {
  registration_number: 1,
  institution: 'CSOB',
  client: customer1,
  contract_administrator: [personel1],
  date_of_creation: new Date(2021, 8, 1),
  validity_date: new Date(2021, 9, 1),
  date_of_closure: new Date(2022, 9, 1)
}

let contract2: Contract = {
  registration_number: 2,
  institution: 'VUB',
  client: customer1,
  contract_administrator: [personel1, personel2],
  date_of_creation: new Date(2020, 8, 1),
  validity_date: new Date(2022, 9, 1),
  date_of_closure: new Date(2023, 9, 1)
}
let contract3: Contract = {
  registration_number: 3,
  institution: 'AEGON',
  client: customer2,
  contract_administrator: [personel2],
  date_of_creation: new Date(2019, 8, 1),
  validity_date: new Date(2019, 9, 1),
  date_of_closure: new Date(2022, 9, 1)
}
let contract4: Contract = {
  registration_number: 4,
  institution: 'CSOB',
  client: customer3,
  contract_administrator: [personel1],
  date_of_creation: new Date(2021, 8, 1),
  validity_date: new Date(2021, 9, 1),
  date_of_closure: new Date(2022, 9, 1)
}
let contract5: Contract = {
  registration_number: 5,
  institution: 'Axa',
  client: customer3,
  contract_administrator: [personel1],
  date_of_creation: new Date(2021, 8, 1),
  validity_date: new Date(2021, 9, 1),
  date_of_closure: new Date(2022, 9, 1)
}

/*
  Simulates data structures that would be recieved by GET calls
  Such as:
    https//:website/personel
    https//:website/customers
    https//:website/contracts
*/

let personel: Array<Personel> = [personel1, personel2]
let customers: Array<Customer> = [customer1, customer2, customer3]
let contracts: Array<Contract> = [contract1, contract2, contract3, contract4, contract5]


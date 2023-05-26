import { Component, Output } from '@angular/core';
import { Contract } from 'src/app/models/contract.model';
import { Customer, Personel } from 'src/app/models/customer.model';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  passContracts: Array<Contract> = contracts;
  passCustomers: Array<Customer> = customers;
  passPersonel: Array<Personel> = personel;

  saveContract(contract: Contract){
    this.passContracts.push(contract)
  }

  saveCustomer(customer: Customer){
    this.passCustomers.push(customer)
  }

  saveEmployee(employee: Personel){
    this.passPersonel.push(employee)
  }

  onDeleteContract(deleteContract: Contract){
    let index = this.passContracts.findIndex(x => x.registration_number === deleteContract.registration_number)
    this.passContracts.splice(index,1)
  }

  onDeleteCustomer(deleteCustomer: Customer){
    let index = this.passCustomers.findIndex(x => x.customer_id === deleteCustomer.customer_id)
    this.passCustomers.splice(index,1)
  }

  onDeleteEmployee(deleteEmployee: Personel){
    let index = this.passPersonel.findIndex(x => x.personel_id === deleteEmployee.personel_id)
    this.passPersonel.splice(index,1)
  }

  onEditContract(editedContract: Contract){
    for(let contract of this.passContracts){
      if(contract.registration_number === editedContract.registration_number)
      Object.assign(contract, editedContract)
    }
  }

  onEditCustomer(editedCustomer: Customer){
    for(let customer of this.passCustomers){
      if(customer.customer_id === editedCustomer.customer_id){
        Object.assign(customer, editedCustomer)
      }
    }
  }

  onEditEmployee(editedEmployee: Personel){
    for(let employee of this.passPersonel){
      if(employee.personel_id === editedEmployee.personel_id){
        Object.assign(employee, editedEmployee)
      }
    }
  }

  onSearchByCustomer(customer: string){
    this.passContracts = contracts;
    customer = customer.toLowerCase()
    if(customer === ''){
      this.passContracts = contracts;
    }
    
    if(customer.length > 0){
      let newContracts: Array<Contract> = [];
      for(let contract of this.passContracts){
        let fullName = contract.client.name + ' ' +  contract.client.surename
        if(fullName.toLowerCase().includes(customer)){
          newContracts.push(contract)
        }
      }
      this.passContracts = newContracts
    }
  }

  onSearchContractEmployee(employeeString: string){
    this.passContracts = contracts;
    employeeString = employeeString.toLowerCase()
    if(employeeString === ''){
      this.passContracts = contracts;
    }
    
    if(employeeString.length > 0){
      let newContracts: Array<Contract> = [];
      for(let contract of this.passContracts){
        for(let person of contract.contract_administrator){
          let fullName = person.name + ' ' +  person.surename
          if(fullName.toLowerCase().includes(employeeString)){
            newContracts.push(contract)
          }
        }
      }
      this.passContracts = newContracts
    }
  }

  onSearchCustomer(searchCustomer: string){
    this.passCustomers = customers;
    searchCustomer = searchCustomer.toLowerCase()
    if(searchCustomer === ''){
      this.passCustomers = customers;
    }

    let newCustomers: Array<Customer> = [];
    for(let customer of this.passCustomers){
      let fullName = customer.name + ' ' + customer.surename
      if(fullName.toLowerCase().includes(searchCustomer)){
        newCustomers.push(customer)
      }
    }
    this.passCustomers = newCustomers
  }

  onSearchEmployee(searchEmployee: string){
    this.passPersonel = personel;
    searchEmployee = searchEmployee.toLowerCase()
    if(searchEmployee === ''){
      this.passPersonel = personel;
    }

    let newEmployees: Array<Personel> = [];
    for(let employee of this.passPersonel){
      let fullName = employee.name + ' ' + employee.surename
      if(fullName.toLowerCase().includes(searchEmployee)){
        newEmployees.push(employee)
      }
    }
    this.passPersonel = newEmployees
  }
}

/*
  Dummy data definition, would be otherwise comming from API calls
*/

let customer1: Customer = {
  customer_id: 1,
  name: 'Mark',
  surename: 'Johnson',
  email: 'mark.johnson@gmail.com',
  phone_number: '+42093248234',
  birth_number: '123123/3232',
  age: 25
}

let customer2: Customer = {
  customer_id: 2,
  name: 'Rick',
  surename: 'Stat',
  email: 'Rick.Stat@gmail.com',
  phone_number: '+42093248234',
  birth_number: '123123/3232',
  age: 48
}
let customer3: Customer = {
  customer_id: 3,
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
  personel_id: 1,
  personel_photo: './assets/profile.jpg'
}

let personel2: Personel = {
  name: 'Chris',
  surename: 'Nowgate',
  email: 'Chris.Nowgate@gmail.com',
  phone_number: '+42093248234',
  birth_number: '123123/3232',
  age: 44,
  personel_id: 2,
  personel_photo: './assets/profile.jpg'
}
  
let contract1: Contract = {
  registration_number: 1,
  institution: 'ČSOB',
  client: customer1,
  contract_administrator: [personel1],
  date_of_creation: new Date("2021-1-16"),
  validity_date: new Date('2021-9-1'),
  date_of_closure: new Date('2022-9-1')
}

let contract2: Contract = {
  registration_number: 2,
  institution: 'VUB',
  client: customer1,
  contract_administrator: [personel1, personel2],
  date_of_creation: new Date('2020-8-1'),
  validity_date: new Date('2021-9-1'),
  date_of_closure: new Date('2023-11-12')
}
let contract3: Contract = {
  registration_number: 3,
  institution: 'AEGON',
  client: customer2,
  contract_administrator: [personel2],
  date_of_creation: new Date('2020-8-1'),
  validity_date: new Date('2021-9-1'),
  date_of_closure: new Date('2023-11-12')
}
let contract4: Contract = {
  registration_number: 4,
  institution: 'ČSOB',
  client: customer3,
  contract_administrator: [personel1],
  date_of_creation: new Date('2020-8-1'),
  validity_date: new Date('2021-9-1'),
  date_of_closure: new Date('2023-11-12')
}
let contract5: Contract = {
  registration_number: 5,
  institution: 'Axa',
  client: customer3,
  contract_administrator: [personel1],
  date_of_creation: new Date('2020-8-1'),
  validity_date: new Date('2021-9-1'),
  date_of_closure: new Date('2023-11-12')
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


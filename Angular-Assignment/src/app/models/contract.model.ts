import { Customer, Personel } from "./customer.model";

export interface Contract{
	registration_number: number;
	institution: string;
	client: Customer;
	contract_administrator: Array<Personel>;
	date_of_creation: Date;
	validity_date: Date;
	date_of_closure: Date;
}
export interface Person{
	name: string;
	surename: string;
	email: string;
	phone_number: string;
	birth_number: string;
	age: number;
}

export interface Customer extends Person{}

export interface Personel extends Person{
	pesonel_id: number;
}
export interface Person{
	name: string;
	surename: string;
	email: string;
	phone_number: string;
	birth_number: string;
	age: number;
}

export interface Customer extends Person{
	customer_id: number;
}

export interface Personel extends Person{
	personel_id: number;
	personel_photo: string;
}
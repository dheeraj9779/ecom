export class User{
  name!:string;
  password!:string;
  uploadPhoto!:string;
  role!:string;
  mobile!:string;
  address!:Address;
  gender!:string;
  language!:string;
  email!:string;
  dob!:string;
  agreetc!:boolean;
  age!:number;
  aboutYou!:string;
}

export class Address{
  id!:number;
  addLine1!:string;
  addLine2!:string;
  city!:string;
  state!:string;
  pincode!:number;
}

export class Product{
  id!:number;
  name!:string;
  uploadPhoto!:string;
  productDesc!:string;
  mrp!:number;
  discount!:number;
  status!:boolean;
}

export class Order{
  id!:number;
  userId!:number;
  sellerId!:number;
  product!:Product
  deliveryAddress!:Address;
  contact!:number;
  dateTime!:string;
}

export class Product {
  _id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;

  constructor(
    _id: number,
    name: string,
    quantity: number,
    image: string,
    price: number
  ) {
    this._id = _id;
    this.name = name;
    this.quantity = quantity;
    this.image = image;
    this.price = price;
  }
}

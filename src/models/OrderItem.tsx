import { Product } from './Product';

export class OrderItem {
  _id: string;
  quantity: number;
  product: Product;

  constructor(_id: string, quantity: number, product: Product) {
    this._id = _id;
    this.quantity = quantity;
    this.product = product;
  }
}

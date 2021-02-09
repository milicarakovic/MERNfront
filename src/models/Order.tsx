import { OrderItem } from './OrderItem';

export class Order {
  _id: string;
  date: Date;
  about: string;
  // userID: number;
  orderItems: OrderItem[];

  constructor(
    _id: string,
    date: Date,
    about: string,
    // userID: number,
    orderItems: OrderItem[]
  ) {
    this._id = _id;
    this.date = date;
    this.about = about;
    // this.userID = userID;
    this.orderItems = orderItems;
  }
}

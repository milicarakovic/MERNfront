export class User {
  _id: number;
  name: string;
  username: string;
  password: string;

  constructor(_id: number, name: string, username: string, password: string) {
    this._id = _id;
    this.name = name;
    this.username = username;
    this.password = password;
  }
}

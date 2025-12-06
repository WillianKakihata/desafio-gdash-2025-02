export class UserResponseModelOut {
  id: string;
  name: string;
  username: string;
  email: string;
  city: string;

   constructor(params: {
    id: string;
    name: string;
    username: string;
    email: string;
    city: string;
  }) {
    Object.assign(this, params);
  }
}
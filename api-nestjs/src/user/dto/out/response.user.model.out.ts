export class UserResponseModelOut {
  id: string;
  name: string;
  username: string;
  email: string;

   constructor(params: {
    id: string;
    name: string;
    username: string;
    email: string;
  }) {
    Object.assign(this, params);
  }
}
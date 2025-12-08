export class TokenResponseModelOut {
  access_token: string;

  constructor(params: {access_token: string}) {
    Object.assign(this, params);
  }
}
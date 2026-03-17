export interface CookieOptions{
  _id: string;
  name: string;
  email: string;
  getJwtToken: () => string;
}
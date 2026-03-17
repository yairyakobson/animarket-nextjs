export interface UserQueryData{
  _id: string;
  name: string;
  email: string;
  avatar: string;
  picture?: {
    public_id: string;
    url: string;
    signed_url: string;
  };
}
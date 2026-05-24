export interface UserQueryData{
  id: string;
  name: string;
  email: string;
  avatar: string;
  public_id: string | null;
  url: string | null;
  signed_url: string | null;
  createdAt: Date;
}
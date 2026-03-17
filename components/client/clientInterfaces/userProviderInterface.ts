export interface UserProviderProps{
  children: React.ReactNode;
  user?: {
    _id: string;
    name: string;
    email: string;
    picture: {
      public_id: string;
      url: string;
      signed_url: string;
    };
    avatar: string;
  } | null;
}
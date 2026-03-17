type NavbarProps = {
  isAuthenticated?: boolean;
  user?: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    picture?: {
      public_id: string;
      url: string;
      signed_url: string;
    }
  } | null;
};
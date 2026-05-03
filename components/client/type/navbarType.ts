type NavbarProps = {
  isAuthenticated?: boolean;
  user?: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    public_id?: string;
    url?: string;
    signed_url?: string;
  } | null;
};
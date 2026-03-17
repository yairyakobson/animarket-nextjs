import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Animarket account"
};

export default async function SigninLayout(
  { children }: Readonly<{ children: React.ReactNode }>
){
  return(
    <section>
      {children}
    </section>
  );
}
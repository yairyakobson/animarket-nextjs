import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new Animarket account"
};

export default async function SignupLayout(
  { children }: Readonly<{ children: React.ReactNode }>
){
  return(
    <section>
      {children}
    </section>
  );
}
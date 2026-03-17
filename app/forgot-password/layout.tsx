import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Recover your Animarket password"
};

export default async function ForgotPasswordLayout(
  { children }: Readonly<{ children: React.ReactNode }>
){
  return(
    <section>
      {children}
    </section>
  );
}
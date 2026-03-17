import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password"
};

export default async function ResetPasswordLayout(
  { children }: Readonly<{ children: React.ReactNode }>
){
  return(
    <section>
      {children}
    </section>
  );
}
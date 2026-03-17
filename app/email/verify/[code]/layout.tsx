import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Verification",
  description: "Verify your email address"
};

export default async function EmailVerificationLayout(
  { children }: Readonly<{ children: React.ReactNode }>
){
  return(
    <section>
      {children}
    </section>
  );
}
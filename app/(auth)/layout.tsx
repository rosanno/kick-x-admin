import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KickX | Login",
  description:
    "Login to your KickX account and enjoy a personalized experience.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-100 h-screen overflow-auto">
      {children}
    </main>
  );
}

import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import { connectToDB } from "@/lib/mongoose";
const inter = Inter({ subsets: ["latin"] });
import { getServerSession } from "next-auth";
import SessionProvider from "../../provider/SessionProvider";
import { Toaster } from "@/components/ui/toaster"
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/provider/theme-provider";

export const metadata: Metadata = {
  title: "Auth",
  description: "Generated by create nextjs app",
};
connectToDB();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (session) {
    redirect(`/`);
  }
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-card`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <section className='main-container flex flex-col items-center justify-center bg-black text-white min-h-screen p-10'>
                {children}
            </section>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

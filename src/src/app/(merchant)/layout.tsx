import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
const inter = Inter({
  subsets: ["vietnamese"],
  weight: ["100", "300", "500"],
});
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import { connectToDB } from "@/lib/mongoose";
import ReduxProvider from "../../provider/ReduxProvider";
import SessionProvider from "../../provider/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/seller/sidebar"

export const metadata: Metadata = {
  title: "WTF Foods",
  description: "Best food in the world",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDB();
  const session = await getServerSession();
  // if (!session) {
  //   redirect(`/login`);
  // }
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

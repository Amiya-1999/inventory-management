import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DigiDukaan",
  description: "Grocery Store for Ram",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          <main className="min-h-screen"> {children}</main>
        </AuthProvider>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2025 DigiDukaan. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

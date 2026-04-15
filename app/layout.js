import { AuthProvider } from '../app/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { getMe } from './_lib/api';
import { cookies } from 'next/headers';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Natours - Explore Amazing Tours',
  description: 'Book amazing tours around the world',
icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default async function RootLayout({ children }) {
  // 1) read jwt cookie set by your natours API on login
  const cookieStore = await cookies();
  console.log("COOKIE STORE:", cookieStore);
  const token =   cookieStore.get('jwt')?.value;

  // 2) fetch user if token exists
  const user = token ? await getMe(token) : null;
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
         <AuthProvider>
        <Toaster position="top-center" />
        <Navbar/>
        {children}
        <Footer />
        </AuthProvider>
        </body>
    </html>
  );
}

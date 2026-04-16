"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getUserPhotoUrl } from '../_lib/api';


export default function Navbar() {
 const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('Logged in successfully!'); // ← success
    router.push('/login');
  };
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link href="/" className="nav__el">
          All tours
        </Link>
      </nav>

      <div className="header__logo">
        <Image
          src="/img/logo-white.png"
          alt="natours logo"
          width={90}
          height={40}
          className="h-10 w-auto"
        />
      </div>

      <nav className="nav nav--user">
        {user ? (
          <>
            <button 
             onClick={handleLogout} 
            className="nav__el nav__el--logout">
              Log out
            </button>

            <Link href="/account" className="nav__el">
              <Image
                className="nav__user-img"
                src={getUserPhotoUrl(user?.photo)}
                alt={`photo of ${user.name}`}
                width={40}
                height={40}
              />
              <span>{user.name.split(" ")[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="nav__el">
              Log in
            </Link>

            <Link href="/signup" className="nav__el nav__el--cta">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
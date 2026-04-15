import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Image
          src="/img/logo-green.png"
          alt="Natours logo"
          width={90}
          height={40}
          className="h-10 w-auto"
        />
      </div>

      <ul className="footer__nav">
        <li>
          <Link href="#">About us</Link>
        </li>
        <li>
          <Link href="#">Download apps</Link>
        </li>
        <li>
          <Link href="#">Become a guide</Link>
        </li>
        <li>
          <Link href="#">Careers</Link>
        </li>
        <li>
          <Link href="#">Contact</Link>
        </li>
      </ul>

      <p className="footer__copyright">
        © by Ahmed Abdelelah . All rights reserved.
      </p>
    </footer>
  );
}
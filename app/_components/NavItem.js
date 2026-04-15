// app/_components/NavItem.jsx

// ✅ Option 1 — default export
export default function NavItem({ link, text, icon, active }) {
  return (
    <li className={`side-nav ${active ? 'side-nav--active' : ''}`}>
      <a href={link}>
        <svg className="side-nav__icon">
          <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
        </svg>
        <span>{text}</span>
      </a>
    </li>
  );
}
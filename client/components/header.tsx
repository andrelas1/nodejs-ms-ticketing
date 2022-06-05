import Link from "next/link";
import { useContext } from "react";
import { ApplicationContext } from "../state/ApplicationContext";

export const Header: React.FC = () => {
  const { currentUser } = useContext(ApplicationContext);

  const links = [
    { label: "Sign Up", href: "/auth/signup", visible: !currentUser.email },
    { label: "Sign In", href: "/auth/signin", visible: !currentUser.email },
    { label: "Sign Out", href: "/auth/signout", visible: !!currentUser.email },
  ].map(({ label, href, visible }) => {
    return visible ? (
      <li key={href} className="nav-item">
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    ) : null;
  });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

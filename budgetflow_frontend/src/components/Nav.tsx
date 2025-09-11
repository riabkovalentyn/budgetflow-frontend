import Link from "next/link";
import { JSX } from "react";
const Nav = (): JSX.Element => {
  const linkClass =
    "px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors";
  return (
    <nav className="border-b border-black/5">
      <div className="container mx-auto px-4">
        <ul className="flex gap-2 sm:gap-3 py-2">
          <li>
            <Link className={linkClass} href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link className={linkClass} href="/transactions">Transactions</Link>
          </li>
          <li>
            <Link className={linkClass} href="/goals">Goals</Link>
          </li>
          <li>
            <Link className={linkClass} href="/ai-advisor">AI Advisor</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

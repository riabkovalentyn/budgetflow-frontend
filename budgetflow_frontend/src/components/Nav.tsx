import Link from 'next/link';
import { JSX } from 'react';

/**
 * A navigation component for the budgeting app.
 * @returns A JSX element to render in the browser.
 */
const Nav = (): JSX.Element => {
  return (
    <nav className="border-b">
      <ul className="container mx-auto p-4 flex gap-4">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/transactions">Transactions</Link>
        </li>
        <li>
          <Link href="/goals">Goals</Link>
        </li>
        <li>
          <Link href="/ai-advisor">AI Advisor</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

import Link from 'next/link';
import { JSX } from 'react';

/**
 * A navigation component for the budgeting app.
 * @returns A JSX element to render in the browser.
 */
const Nav = (): JSX.Element => {
  return (
    <nav>
      <ul>
        {/* Dashboard link */}
        <li>
          <Link href="/">
            <a href="">Dashboard</a>
          </Link>
        </li>

        {/* Transactions link */}
        <li>
          <Link href="/transactions">
            <a href="">Transactions</a>
          </Link>
        </li>

        {/* Goals link */}
        <li>
          <Link href="/goals">
            <a href="">Goals</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

import Nav from "./Nav";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-10">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Logo />
      </div>
      <Nav />
    </header>
  );
};

export default Header;

import Nav from "./Nav";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-black/5 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
      </div>
      <Nav />
    </header>
  );
};

export default Header;

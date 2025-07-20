import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image src="/logo.png" alt="Logo" width={150} height={50} />
    </div>
  );
};

export default Logo;

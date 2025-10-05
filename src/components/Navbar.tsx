import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">MyApp</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">home</Link>
          <Link href="/message" className="text-gray-300 hover:text-white">message</Link>
          <Link href="/financial" className="text-gray-300 hover:text-white">financial</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
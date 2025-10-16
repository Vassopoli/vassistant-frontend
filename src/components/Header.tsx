import Navbar from "./Navbar";

const Header = ({ signOut, user }: { signOut?: () => void; user?: any }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Navbar signOut={signOut} user={user} />
      </div>
    </header>
  );
};

export default Header;
import Navbar from "./Navbar";

const Header = ({ signOut, user }: { signOut?: () => void; user?: any }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Navbar />
        {user && (
          <button
            onClick={signOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
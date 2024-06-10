import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Booking.com</Link>
        </span>
        <span className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link 
                to="/my-bookings" 
                className="flex items-center text-white px-4 py-2 font-semibold hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                My Bookings
              </Link>
              <Link 
                to="/my-hotels" 
                className="flex items-center text-white px-4 py-2 font-semibold hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                My Hotels
              </Link>
              <SignOutButton/>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white text-blue-600 px-4 py-2 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-md"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;

import { LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { sidebarOptions } from "@/constants/sidebarOptions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowSidebar(false);
  }, [location]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Navbar */}
      <nav className="bg-accent shadow-md md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h2 className="text-2xl text-primary font-semibold italic">
                  Dashboard
                </h2>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {showSidebar ? (
                  <X
                    color="black"
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                ) : (
                  <Menu
                    color="black"
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-30 w-64 md:w-80 bg-accent overflow-y-auto transition-transform duration-300 ease-in-out 
        ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 flex flex-col justify-between min-h-screen`}
      >
        <div>
          <div className="p-4">
            <p className="mb-3 text-2xl text-primary italic font-bold">
              Dashboard
            </p>
          </div>
          <div className="px-4 flex-grow">
            {sidebarOptions.map((option) => (
              <Link
                className={`block px-4 py-2 rounded-md ${
                  location.pathname === `${option.route}`
                    ? "bg-secondary text-white"
                    : ""
                }`}
                key={option.title}
                to={`${option.route}`}
              >
                {option.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <p className="size-10 flex items-center justify-center bg-primary rounded-full"><User color="white"/></p>
            <div>
              <p>{user?.name}</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogOut} className="flex items-center justify-center w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200">
            <LogOut className="mr-2" size={20} />
            LogOut
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow overflow-auto p-4 md:ml-80">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

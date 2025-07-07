import React from 'react'
import useAuthUser from '../hooks/useAuthUser.js'
import { Link, useLocation } from 'react-router';
import { BellIcon, EarthIcon, LogOutIcon } from 'lucide-react';
import ThemeSelector from "./ThemeSelector.jsx";
import useLogout from '../hooks/useLogout.js';
import { toast } from 'react-hot-toast';


const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  const handleLogoutClick = () => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        <span>Are you sure you want to logout?</span>
        <div className="flex gap-2 justify-end">
          <button
            className="btn btn-sm btn-error"
            onClick={() => {
              logoutMutation();
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </span>
    ));
  };


  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* Logo only in the chat page */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <EarthIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  ConvoLink
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar">
            <button className="btn btn-ghost btn-circle">
              <Link to={"/profile"}>
                <div className="w-9 rounded-full">
                  <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
                </div>
              </Link>
            </button>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={handleLogoutClick}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>

    </nav>
  )
}

export default Navbar
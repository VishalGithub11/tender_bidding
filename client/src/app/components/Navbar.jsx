"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";


const Navbar = () => {
    // const [user, setUser] = useState(null)
    const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    setUser(null)
    router.push("/login")
  };

  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <div className="flex gap-x-6 text-white">
          <ul className="hidden md:flex">
            <li>
              <Link href="/">
                <p className="hover:text-white mr-4">ViEx</p>
              </Link>
            </li>
          {user && user.role === "admin" && <li>
              <Link href="/create-tender">
                <p className="hover:text-white mr-4">Create-Tender</p>
              </Link>
            </li>}
            {user && user.role === "admin" && <li>
              <Link href="/bids">
                <p className="hover:text-white">Bids</p>
              </Link>
            </li>}
          </ul>
        </div>
        <div className="flex gap-x-6 text-white">
          {user ? (
            <>
              <p className="mr-4">Welcome, {user.name}</p>
              <button onClick={handleLogout} className="hover:text-white">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login">
                <p className="hover:text-white">Login</p>
              </Link>
              <Link href="/signup">
                <p className="hover:text-white">Sign Up</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

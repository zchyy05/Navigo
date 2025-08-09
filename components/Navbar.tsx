"use client";
import { login, logout } from "@/lib/auth-actions";
import { Github, LogOut } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href={"/"} className="flex  items-center">
          <Image src={"/logo.png"} alt="Logo" width={50} height={50} priority />
          <span className="text-2xl font-bold color-gray-800">Navigo</span>
        </Link>
        {session ? (
          <div className="flex items-center space-x-4">
            <Link
              href={"/trips"}
              className="text-slate-900 font-medium hover:text-primary"
            >
              My trips
            </Link>
            <Link
              href={"/globe"}
              className="text-slate-900 font-medium hover:text-primary"
            >
              Globe
            </Link>
            <button
              onClick={logout}
              className="flex items-center justify-center bg-primary gap-2 text-primary-foreground p-2 text-lg rounded-sm cursor-pointer hover:bg-primary/80 transition"
            >
              Sign out
              <LogOut className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={login}
              className="flex items-center justify-center bg-primary gap-2 text-primary-foreground p-2 text-lg rounded-sm cursor-pointer hover:bg-primary/80 transition"
            >
              Sign In
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.41 2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.23 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

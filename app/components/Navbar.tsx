"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { authenticatedUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 container lg">
      <div className="flex-1">
        <Link href="/" className="px-1 text-xl text-slate-600">
          GreenMétéo
        </Link>
      </div>

      <div className="flex-none">
        <Link
          href="/about"
          className="btn btn-square btn-ghost"
          title="À propos de GreenMétéo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-blue-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </Link>

        {authenticatedUser && (
          <button
            className="btn btn-square btn-ghost"
            title="Déconnexion"
            onClick={() => {
              if (logout) {
                logout();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
              className="size-6 text-red-700"
            >
              <path
                fill="currentColor"
                d="M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12c4.05 0 7.64-2.012 9.813-5.094l-1.625-1.156A9.99 9.99 0 0 1 16 26c-5.535 0-10-4.465-10-10S10.465 6 16 6a9.99 9.99 0 0 1 8.188 4.25l1.625-1.156A11.99 11.99 0 0 0 16 4m7.344 7.281l-1.438 1.438L24.188 15H12v2h12.188l-2.282 2.281l1.438 1.438l4-4L28.03 16l-.687-.719z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

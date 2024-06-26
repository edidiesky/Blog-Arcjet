"use client";
import React from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
const Navbar = () => {
  const linkData = [
    {
      text: "Home",
      path: "",
    },
    {
      text: "About",
      path: "",
    },
    {
      text: "Blog",
      path: "",
    },
    {
      text: "Contact",
      path: "",
    },
  ];
  return (
    <div className="w-full py-6 bg-[#000]">
      <div className="w-[90%] max-w-custom mx-auto flex items-center gap-4 justify-between">
        <Link href={"/"} className="text-xl font-semibold text-white">
          Envita Blog
        </Link>
        <ul className="hidden md:flex items-center justify-end gap-8">
          {linkData?.map((data, index) => {
            return (
              <Link
                key={index}
                className="text-base text-grey font-semibold hover:text-white"
                href={`#`}
              >
                {data?.text}
              </Link>
            );
          })}
          <li className="text-base text-grey font-semibold hover:text-white">
            Login
          </li>
          <li className="text-base text-grey font-semibold hover:text-white">
            Sign Up
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

"use client"
import { signIn } from "next-auth/react";
import React from "react";
const LoginBtn = () => {
  return (
    <div className="text-base cursor-pointer text-grey font-semibold hover:text-white">
      <button className='btn py-3 px-4 rounded-[10px] text-base text-white' onClick={() => signIn("google")} >
        Signin
      </button>
    </div>
  );
};

export default LoginBtn;

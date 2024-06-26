"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { BlogData } from "@/utils/data/blogdata";

const CommentData = [
  {
    id: 4565483929237,
    shortDescription:
      " Discover the benefits of sustainable gardening and tips to get started.",
    author: "Jane Smith",
    createdAt: "April 15, 2023",
  },
  {
    id: 44547484984,
    shortDescription:
      "From sustainable materials to energy-efficient upgrades, we've got you covered.",
    author: "Michael Johnson",
    createdAt: "March 28, 2023",
  },
  {
    id: 4745644647884,
    shortDescription:
      "Your choices when it comes to your wardrobe. Reduce waste and support ethical brands.",
    author: "Sarah Lee",
    createdAt: "February 10, 2023",
  },
];
const MainContent = ({ blogid }) => {
  // console.log(blogid);
  const blog = BlogData?.find((blog) => blog.id === blogid);
  // console.log(blog);

  return (
    <div className="flex flex-col relative w-full gap-4">
      {/* {loading && <Loader />} */}
      <div className="w-full flex flex-col gap-8">
        {/* single posts */}
        <div className="w-full flex items-center justify-center bg-[#fff] py-12">
          <div className="w-[90%] md:w-[500px] max-w-custom_1 flex flex-col items-start gap-4 justify-center mx-auto">
            <div className="flex w-full flex-col gap-8">
              <h4 className="text-2xl md:text-4xl font-bold">
                Sign in Here
                <span className="block font-normal text-base pt-4 text-grey">
                  Login in to your account to have access to exclusive rights
                  and contents
                </span>
              </h4>
              <form className="w-full flex flex-col gap-4">
                <label
                  htmlFor="name"
                  className="text-base flex flex-col gap-4 font-semibold"
                >
                  Email
                  <input type="email" className="input" />
                </label>
                <label
                  htmlFor="Password"
                  className="text-base flex flex-col gap-4 font-semibold"
                >
                  Password
                  <input type="password" className="input" />
                </label>
                <div className="flex pt-4">
                  <button className="btn py-3 px-8 rounded-xl text-white text-lg">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
